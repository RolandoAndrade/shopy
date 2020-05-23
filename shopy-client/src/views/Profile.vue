<template>
    <Container>
         <div class="inline to-column">
                <div class="column pa-2">
                    <v-avatar color="orange" size="60" class="mr-4" onclick="document.getElementById('file').click();" >
                        <span v-if="image === false" class="white--text headline">{{getFirstChar}}</span>
                        <img v-else src="../assets/team/stephanie.jpeg" />
                    </v-avatar>
                    <input type="file" id="file" style="display:none;" @change="previewImage"/>
                </div>
                <Title size="title-secondary">{{this.$language.get('my-profile.title')}}</Title>
        </div> 
        <div class="flex ma-4">
            <div class="title-terciary">{{this.$language.get('my-profile.hi')}} {{user.name}} {{user.lastName}}</div>
        </div>   
         <v-expansion-panels accordion >
            <v-expansion-panel>
                    <v-expansion-panel-header class="title-terciary">{{this.$language.get('my-profile.personal-info')}}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="flex to-column">
                            <div class="form__group column half pr-4 mt-4 mb-4">
                                <label >{{this.$language.get('user.name')}}:</label>
                                <input
                                    type="text"
                                    class="form__input "
                                    :placeholder="user.name"                     
                                    v-model="userEdit.name"
                                    required
                                />  
                            </div>
                            <div class="form__group column half mt-4 mb-4">
                                <label >{{this.$language.get('user.last-name')}}:</label>
                                <input
                                    type="text"
                                    class="form__input "
                                    :placeholder="user.lastName"                     
                                    v-model="userEdit.lastName"
                                    required
                                />  
                            </div>
                        </div>
                         <div class="flex to-column  ">
                            <div class="form__group half pr-4 mt-4 mb-4">
                                    <label >{{this.$language.get('user.email')}}:</label>
                                    <input
                                        type="text"
                                        class="form__input "
                                        :placeholder="user.email"                     
                                        v-model="userEdit.email"
                                        required
                                    />  
                            </div>    
                            <div class="form__group half mt-4 mb-4" v-on:click="openModal" >
                                <label >{{this.$language.get('user.birthday')}}:</label>
                                <input type="" class="form__input" :placeholder="userEdit.date ==='' ? user.date :userEdit.date" id="birthday"  readonly>
                            </div>    
                         </div>
                        <DatePopup ref="dateModal" :date="user.date" @getDate="getDate"/>     
                    </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header class="title-terciary">{{this.$language.get('my-profile.my-address')}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                        <div class="flex to-column">
                            <div class="form__group column half pr-4 mt-4 mb-4">
                                <label >{{this.$language.get('address.primary-line')}} * :</label>
                                <input
                                    type="text"
                                    class="form__input "
                                    :placeholder="user.address.primaryLine"                     
                                    v-model="userEdit.name"
                                    required
                                />  
                            </div>
                            <div class="form__group column half mt-4 mb-4">
                                <label >{{this.$language.get('address.secondary-line')}}:</label>
                                <input
                                    type="text"
                                    class="form__input "
                                    :placeholder="user.address.secondaryLine"                     
                                    v-model="userEdit.lastName"
                                    required
                                />  
                            </div>
                        </div>
                        <div class="flex to-column">
                            <div class="flex to-column half">
                                <div class="form__group column half pr-4 mt-4 mb-4">
                                    <label >{{this.$language.get('address.city')}} * :</label>
                                    <input
                                        type="text"
                                        class="form__input "
                                        :placeholder="user.address.city"                     
                                        v-model="userEdit.name"
                                        required
                                    />  
                                </div>
                                 <div class="form__group column half pr-4 mt-4 mb-4">
                                    <label >{{this.$language.get('address.state')}} * :</label>
                                    <input
                                        type="text"
                                        class="form__input "
                                        :placeholder="user.address.state"                     
                                        v-model="userEdit.name"
                                        required
                                    />  
                                </div>
                            </div>
                            <div class="inline to-column half">
                                <div class="form__group column half pr-4 mt-4 mb-4">
                                    <label >{{this.$language.get('address.zip-code')}} * :</label>
                                    <input
                                        type="text"
                                        class="form__input "
                                        :placeholder="user.address.zipCode"                     
                                        v-model="userEdit.name"
                                        required
                                    />  
                                </div>
                            </div>
                            
                        </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
         <v-expansion-panel>
             <v-expansion-panel-header class="title-terciary">{{this.$language.get('my-profile.account-info.title')}}</v-expansion-panel-header>
             <v-expansion-panel-content>
                 <div class="flex">
                    <div  style="width:150px">
                        <label >{{this.$language.get('my-profile.account-info.my-currency')}} :</label>
                        <v-combobox
                                    
                                    v-model="currentCurrency"
                                    :items="items"
                                    dense
                                    class=""
                                    color="purple"
                                    item-color="purple"
                                    hide-details
                                    single-line="true"
                                ></v-combobox>
                    </div>
                 </div>
                <div class="flex to-column mt-4">
                                <div class="form__group column half pr-4 mt-4 mb-4">
                                    <label >{{this.$language.get('my-profile.account-info.old-password')}} :</label>
                                    <input
                                        type="password"
                                        class="form__input "                       
                                        required
                                    />  
                                </div>
                                 <div class="form__group column half pr-4 mt-4 mb-4">
                                    <label >{{this.$language.get('my-profile.account-info.new-password')}}  :</label>
                                    <input
                                        type="password"
                                        class="form__input "                                   
                                        required
                                    />  
                                </div>
                </div>
             </v-expansion-panel-content>
         </v-expansion-panel>
        </v-expansion-panels>
        <div class="flex ma-4">
            <ButtonSecondary  @click.native="saveChanges">{{this.$language.get('generic.save')}}</ButtonSecondary>
        </div>  
    </Container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Container from '@/components/layout/Container.vue';
import Title from '@/components/typography/Title.vue';
import { ProfileInterface} from '../interfaces/profile.interface';
import ButtonSecondary from '@/components/generic/ButtonSecondary.vue';
import DatePopup from '@/components/generic/popups/DatePopup.vue';

@Component({
    components: {
        Container,
        Title,
        ButtonSecondary,
        DatePopup
    }
})
export default class Profile extends Vue {
    private image: boolean = false;
    private imageData :  string | null ='';
    private dateModal =false;

    //de pruebita
    private user: ProfileInterface = {
        name: 'Stephanie',
        lastName: 'Cruz',
        email:'scruz.17@est.ucab.edu.ve',
        date:new Date().toISOString().substr(0, 10),
        address: {
            primaryLine: '7704 NW 5th st',
            secondaryLine:'',
            city:'FL',
            state:'FL',
            zipCode: 33324

        }
    };



    private items: Array<string> =['Bs.F','$'];
    private currentCurrency: string ='Bs.F';
// de prueba
    private userEdit?: ProfileInterface={
        name:'',
        lastName:'',
        email:'',
        date: ''
    }
    private prueba? :string;
    $refs!: {
        dateModal: any
    }
    private previewImage(e: Event) {
            const target= e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageData = e.target!.result as string;
                }
                reader.readAsDataURL(target.files[0]);
            }
            this.image === true;
    }

    get getFirstChar() {
        return this.user.name!.substr(0, 1) + this.user.lastName!.substr(0, 1);
    }

    private openModal(){
          this.$refs.dateModal.openModal();
    }

    private returnChanges(x: string) {
       // console.log(this.userEdit.name, this.user.name);
        //  this.userEdit.name=this.user.name;
    }

    private getDate(date: string){
        this.userEdit!.date=date;
    }

    private saveChanges(){
        //
    }
}
</script>

<style>
</style>