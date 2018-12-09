<template>
  <div id="app">
    <manage-form v-bind:fields="config"></manage-form>
  </div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
import { Datetime } from 'vue-datetime'
import config from './config.json'
import Form from './task/task.vue'
import 'vue-datetime/dist/vue-datetime.css'
import './styles/main.less'

Vue.component('v-select', vSelect)
Vue.component('datetime', Datetime)

export default {
  name: 'app',
  components: {
    manageForm: Form
  },
  data: () => ({
    config
  })
}
</script>
