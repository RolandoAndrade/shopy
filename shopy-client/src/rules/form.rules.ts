export class FormRules {
    required(message: string)
    {
        return (v: any) => !!v || message;
    }
}