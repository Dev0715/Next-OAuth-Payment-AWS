"use server";

import { SendEmailCommand } from "@aws-sdk/client-ses";

import sesClient from "@/lib/ses";

type Params = {
  from: string;
  to: string[];
  subject: string;
  html: string;
};

export const sendEmail = async ({ from, to, subject, html }: Params) => {
  try {
    const command = new SendEmailCommand({
      Source: from,
      Destination: {
        ToAddresses: to
      },
      Message: {
        Subject: {
          Data: subject
        },
        Body: {
          Html: {
            Data: html
          }
        }
      }
    });

    await sesClient.send(command);
    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};
