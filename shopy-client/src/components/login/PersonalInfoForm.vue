<template>

    <div  class="form">
             <Title :size="'title-secondary'"  class="pt-6" style="tex-align:start;">Sign up into Shopy</Title>
              <div class="image-preview mt-4" onclick="document.getElementById('file').click();">
                    <img class="preview"  :src="getImage()">
              </div> 
              <input type="file" id="file" style="display:none;"  @change="previewImage"/>
              <div class="flex to-column">
                <div class="form__big-group" style="margin-top:-17px;" >
                    <div class="title-center mt-2">Choose your profile photo!</div>

                        <div class="form__group mt-2 " >
                            <input type="text" v-model="firstName" class="form__input" placeholder="First Name" id="name" required>
                            <label for="name" class="form__label">First Name</label>
                            <div v-for="(i,ind) in firstNameErrors"  :key="ind" class="text-error mt-2">{{i}}</div>

                        </div>
                        <div class="form__group" >
                            <input type="text" v-model="lastName" class="form__input" placeholder="Last Name" id="lastname" required>
                            <label for="lastname" class="form__label">Last Name</label>
                            <div v-for="(i,ind) in lastNameErrors"  :key="ind" class="text-error mt-2">{{i}}</div>
                        </div>
                        <div class="form__group" v-on:click="dateModal = true" >
                            <input type="" class="form__input" :placeholder="date" id="birthday"  readonly>
                            <label for="birthday" class="form__label">{{date}}</label>
                        </div>  
                        <ButtonPrimary :color="'purple'" class="flex mb-6"  @click.native="signUp">Sign up</ButtonPrimary>
                </div>
                <div class="form__big-group">
                    <div class="title-center mb-2">Tell us your address: </div>
                    <div class="form__group">
                        <input type="" class="form__input" v-model="addressPrimaryLine" placeholder="Primary Line *" id="primary-line" required>
                        <label for="primary-line" class="form__label">Primary Line *</label>
                        <div v-for="(i,ind) in addressPrimaryLineErrors"  :key="ind" class="text-error mt-2">{{i}}</div>

                    </div>
                    <div class="form__group" >
                        <input type="" class="form__input" placeholder="Secondary line" id="secondary-line" required>

                        <label for="secondary-line" class="form__label">Secondary line</label>
                    </div>
                    <div class="form__group flex" >
                        <div class="form__group-half mr-2">
                            <input type="" class="form__input" placeholder="City" id="city" required>
                            <label for="city" class="form__label">City</label>
                        </div>

                        <div class="form__group-half">
                            <input type="" v-model="addressState" class="form__input" placeholder="State" id="state" required>
                            <label for="state" class="form__label">State</label>
                            <div v-for="(i,ind) in addressStateErrors"  :key="ind" class="text-error mt-2">{{i}}</div>
                        </div>
                    </div>
                    <div class="form__group" >
                        <input type="number" class="form__input" placeholder="Zip code" id="code" required>
                        <label for="code" class="form__label">Zip code</label>
                    </div>
                </div>
            </div>
                    <v-dialog ref="dialog" v-model="dateModal" :return-value.sync="date"
                               persistent width="290px">
                            <v-date-picker v-model="date" color="purple" scrollable>
                                 <v-spacer></v-spacer>
                                     <v-btn text color="purple" @click="modal = false">Cancel</v-btn>
                                     <v-btn text color="purple" @click="$refs.dialog.save(date)">OK</v-btn>
                                 </v-date-picker>
                    </v-dialog>
                    
                   <PopupDecition ref="decitionModal"  @receiveResponse="receiveResponse" text='Do you want to continue without a profile picture?'/> 

                    </v-dialog>
    </div>

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from 'vue-property-decorator';
import Title from '@/components/typography/Title.vue';
import ButtonPrimary from '@/components/generic/ButtonPrimary.vue';
import PopupDecition from '@/components/generic/PopupDecition.vue';
import { validationMixin } from 'vuelidate';
import { ValidationProperties } from 'vue/types/vue';
import { required} from 'vuelidate/lib/validators';

@Component({
    components:{
        Title,
        ButtonPrimary,
        PopupDecition
    },
    mixins: [validationMixin],
    validations: {
        firstName: {required},
        lastName: {required},
        addressPrimaryLine:{required},
        addressCity:{required},
        addressState:{required}

    }
})
export default class PersonalInfoForm extends Vue{

    private imageData :  string | null ='';
    private image! : File;
    private menu: boolean =false;
    private dateModal: boolean =false;
    private date = new Date().toISOString().substr(0, 10);
    $refs!: {
        decitionModal: any
    }

    private imageModal: boolean = false;
    private firstName : string='';
    private lastName : string='';
    private addressPrimaryLine: string ='';
    private addressCity: string='';
    private addressState: string ='';

        private previewImage(e: Event) {
            const target= e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target!.result as string;
                }
                reader.readAsDataURL(target.files[0]);
            }
        }

        private getImage(): string{
            if (this.imageData!.length>0) return this.imageData!
            else return require('../../assets/camera.png')
        }

        private signUp(){

            if (!this.image){
                this.$refs.decitionModal.openModal();
            }
        }

        private receiveResponse(response: string){
            this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }else{ 
                    if (!this.image){
                        this.imageModal = true;
                    }
                    this.$emit('changePage');
                }
        }

         get firstNameErrors(){
            const errors : Array<string> =[];
            if (!this.$v.firstName.$dirty) return errors;
            !this.$v.firstName.required && errors.push('First Name is required')
            return errors;
        }
        get lastNameErrors(){
            const errors : Array<string> =[];
            if (!this.$v.lastName.$dirty) return errors;
            !this.$v.lastName.required && errors.push('Last Name is required')
            return errors;
        }

        get addressPrimaryLineErrors(){
            const errors : Array<string> =[];
            if (!this.$v.addressPrimaryLine.$dirty) return errors;
            !this.$v.addressPrimaryLine.required && errors.push('Address is required')
            return errors;
        }
        get addressCityErrors(){
            const errors : Array<string> =[];
            if (!this.$v.addressCity.$dirty) return errors;
            !this.$v.addressCity.required && errors.push('City is required')
            return errors;
        }
        get addressStateErrors(){
            const errors : Array<string> =[];
            if (!this.$v.addressState.$dirty) return errors;
            !this.$v.addressState.required && errors.push('State is required')
            return errors;
        }
        


}
</script>

<style>
.image-preview{
    width:min-content;
    margin-left: 125px;
    margin-bottom:10px;
}

img.preview {
    width: 50px;
    height: auto;
    margin:0 auto;
    cursor:pointer;
}
</style>