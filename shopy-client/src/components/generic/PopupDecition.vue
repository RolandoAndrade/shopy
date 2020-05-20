<template>
   <v-dialog v-model="localModal" persistent max-width="290">
            <v-card>
                <v-card-title class="headline">{{text}}</v-card-title>
                 <v-divider></v-divider>
                <Icon v-if="icon" icon='icon-x-circle' size='icon-big' color='error-i' class="mt-4"/>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="purple" text @click="sendResponse('no')">No</v-btn>
                    <v-btn color="purple" text @click="sendResponse('yes')">Yes</v-btn>
                </v-card-actions>
            </v-card>
   </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components:{
      
    }
})
export default class PopupDecition extends Vue {

    @Prop() text! : string;
    @Prop() icon? : boolean;

    private localModal : boolean = false;

    private sendResponse(response : string){
        this.localModal=false;
        this.$emit('receiveResponse',response);
    }

    private openModal(){
        this.localModal = true;
    }
}
</script>

<style>

</style>