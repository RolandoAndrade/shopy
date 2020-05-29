export class ImageWidget {
    private _widget: { open(): void };
    constructor(endFunction: Function) {
        //@ts-ignore
        this._widget = cloudinary.createUploadWidget(
            {
                cloudName: process.env.VUE_APP_CLOUD_NAME,
                uploadPreset: process.env.VUE_APP_UPLOAD_PRESET
            },
            (error: {}, result: { event: string; info: { url: string } }) => {
                if (!error && result && result.event === 'success') {
                    endFunction(result.info.url);
                }
            }
        );
    }

    open() {
        this._widget.open();
    }
}
