import emailjs from "emailjs-com";

export const sendEmail = async (templateId, variables) => {
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId,
      variables,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );
  } catch (error) {
    console.error("Email sending failed:", error);
  }
};
