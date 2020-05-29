import Vue from 'vue';
import { ImageWidget } from '@/utils/image-widget';
import { Component } from 'vue-property-decorator';

@Component
export default class MultipleImageLoader extends Vue {
    private _uploadWidget!: ImageWidget;
    images: (string | undefined)[] = [undefined];
    selectedImage = 0;

    uploadImage(index?: number) {
        if (index) this.selectedImage = index;
        this._uploadWidget.open();
    }

    addImage(url: string): void {
        if (this.images.length) {
            this.images[this.selectedImage] = url;
        } else {
            this.images.push(url);
        }
        this.images.push(undefined);
    }

    mounted() {
        this._uploadWidget = new ImageWidget(this.addImage);
    }
}
