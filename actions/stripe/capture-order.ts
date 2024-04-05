"use server";

import stripe from "@/lib/stripe";

type OrderType = {
  paymentId: string;
};

export const captureOrder = async (params: OrderType) => {
  let payment = await stripe.checkout.sessions.retrieve(params.paymentId);
  let lineItems = await stripe.checkout.sessions.listLineItems(
    params.paymentId,
    {
      limit: 1
    }
  );
  let transaction = await stripe.paymentIntents.retrieve(
    payment.payment_intent as string
  );
  await TransactionModel.create({
    user: payment.client_reference_id,
    transaction_id: transaction.id,
    amount: transaction.amount / 100,
    currency: payment.currency.toUpperCase(),
    type: "stripe",
    note: "membership"
  });
  let user = await UserModel.findById(payment.client_reference_id);
  let lastInvoice = await InvoiceModel.findOne().sort({
    invoice_id: -1
  });
  let invoice = await InvoiceModel.create({
    user: payment.client_reference_id,
    invoice_id: lastInvoice ? lastInvoice.invoice_id + 1 : 11231,
    item_name: lineItems.data[0].description,
    item_description: lineItems.data[0].description,
    amount: lineItems.data[0].amount_total / 100,
    gst: lineItems.data[0].amount_tax / 100,
    currency: lineItems.data[0].currency,
    paid_date: moment.unix(payment.created).format("YYYY-MM-DD HH:mm:ss"),
    isPaid: true
  });
  let history = await MembershipHistoryModel.findById(historyId);
  let expiredDate = "";
  if (Number(history.period) == -1) {
    expiredDate = moment().add(24, "M").format("YYYY-MM-DD HH:mm:ss");
  } else {
    expiredDate = moment()
      .add(history.period, "M")
      .format("YYYY-MM-DD HH:mm:ss");
  }
  await history.update({
    invoice: invoice._id,
    isPaid: true,
    expiredDate: expiredDate
  });

  // Add purchased subject history.
  let subjects = history.subjects;
  for (let i in subjects) {
    // Create Purchased Subject Invoice
    await PurchasedSubjectInvoiceModel.create({
      user: invoice.user,
      subject_id: subjects[i]._id,
      invoice_id: invoice.invoice_id,
      item_name: invoice.item_name,
      item_description: invoice.item_description,
      amount: invoice.amount,
      gst: invoice.gst,
      currency: invoice.currency,
      paid_date: invoice.paid_date,
      isPaid: invoice.isPaid
    });

    // Create or Update Purchased Subject History
    let subjectHis = await PurchasedSubjectHistoryModel.findOne({
      user: payment.client_reference_id,
      subject: subjects[i]._id
    });
    if (subjectHis != null) {
      if (history.period == -1) {
        expiredDate = moment(subjectHis.expiredDate)
          .add(24, "M")
          .format("YYYY-MM-DD HH:mm:ss");
        await subjectHis.updateOne({
          invoice: invoice._id,
          period: -1,
          expiredDate: expiredDate
        });
      } else if (subjectHis.period == -1) {
        expiredDate = moment(subjectHis.expiredDate)
          .add(history.period, "M")
          .format("YYYY-MM-DD HH:mm:ss");
        await subjectHis.updateOne({
          invoice: invoice._id,
          period: -1,
          expiredDate: expiredDate
        });
      } else {
        expiredDate = moment(subjectHis.expiredDate)
          .add(history.period, "M")
          .format("YYYY-MM-DD HH:mm:ss");
        await subjectHis.updateOne({
          invoice: invoice._id,
          period: history.period,
          expiredDate: expiredDate
        });
      }
    } else {
      await PurchasedSubjectHistoryModel.create({
        user: payment.client_reference_id,
        subject: subjects[i]._id,
        invoice: invoice._id,
        period: history.period,
        expiredDate: expiredDate
      });
    }
  }

  let sendEmailParams = {
    invoiceId: invoice._id,
    subjectsNum: history.subjects.length,
    user
  };
  await sendEmail(sendEmailParams, res);
  return res.json({
    success: true,
    invoiceId: invoice._id,
    membershipId: user.membership,
    msg: "Successfully purchased. Please check your email for details."
  });
};
