<template>
                      <v-dialog ref="dialog" v-model="modal" :return-value.sync="date"
                               persistent width="290px">
                            <v-date-picker v-model="localDate" color="purple" scrollable>
                                 <v-spacer></v-spacer>
                                     <v-btn text color="purple" @click="modal = false">Cancel</v-btn>
                                     <v-btn text color="purple" @click="$refs.dialog.save(localDate)">OK</v-btn>
                                 </v-date-picker>
                    </v-dialog>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop, Watch} from 'vue-property-decorator';

@Component({})
export default class DatePopup extends Vue{

    @Prop() date? : string;
    private modal : boolean = false;
    private localDate: string=this.date!;

    private openModal(){
        this.modal = true;
    }

    private sendResponse(response: string) {
        this.modal = false;
        console.log(this.localDate)
    }

    @Watch('localDate')
        onDateChange(){
            console.log(this.localDate);
            this.$emit('getDate',this.localDate);
        }
    
    

}
</script>

<style>

</style>