<template>
    <div class="dashboard-vue">
        <v-ons-page class="Page-MT">
            <Signin/>
        </v-ons-page>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import  Signin  from '@/components/Signin/Signin';
import { authService } from '../../auth-service'

export default {
    components: {
        Signin,
    },
}

</script>