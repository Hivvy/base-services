import Mail from "@/config/mail";

class OtpMail {
    private mail: Mail;
    private email: string;
    constructor(email: string, otp: string) {
        this.mail = new Mail();
        this.email = email;

        this.mail.send({
            from: "sender@example.com",
            to: this.email,
            subject: "Verify your Otp",
            html: `<b>Your otp is ${otp}</b>`,
        });
    }
}

export default OtpMail;
