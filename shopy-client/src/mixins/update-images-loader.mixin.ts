import Vue from 'vue';
import { ImageWidget } from '@/utils/image-widget';
import { Component } from 'vue-property-decorator';
import { ProductImage } from '../requests/product-image/ProductImage';

@Component
export default class UpdateImagesLoader extends Vue {
    private _uploadWidget!: ImageWidget;
    images: ProductImage[] = [];
    selectedImage = 0;
    newImages: ProductImage[] = [];

    uploadImage(index?: number) {
        this._uploadWidget.open();
    }

    addImage(url: string): void {
        this.images.push({ image: url });
        this.newImages.push({ image: url });
    }

    mounted() {
        this._uploadWidget = new ImageWidget(this.addImage);
    }
}
