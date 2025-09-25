
export interface MailAdapter {
    send(props: SendMail): Promise<void>;
}

export interface SendMail {
    email: string;
    subject: string;
    html: string;
}