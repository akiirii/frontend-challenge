<template>
  <div>
    <div class="page-load-error" v-if="generalError">{{generalError}}</div>

    <div v-if="!generalError">

      <div class="error-message" v-if="message">{{message}}</div>

      <div v-for="field in fields" :key="field.name">

        <label v-if="field.type !== 'datepicker'">{{field.label}}</label>

        <input v-if="field.type === 'input'" v-model="task[field.name]"/>
        <v-select v-if="field.type === 'select'" v-model="task[field.name]" :options="options[field.name]"></v-select>

        <datetime v-if="field.type === 'datepicker'" v-model="task[field.name]">
          <label slot="before">{{field.label}}</label>
        </datetime>

        <div class="error" v-if="error && error[field.name] && submited">This field is requred</div>

      </div>

      <button v-on:click="submit">Save</button>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { forEach, find } from 'lodash'

export default {
  name: 'Form',
  props: {
    fields: Array,
  },
  data: function () {
    return {
      task: {
        name: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        phone: '',
        deliveryAt: '',

      },
      options: {
        country: ['pl', 'de']
      },
      submited: false,
      message: '',
      generalError: '',
    }
  },
//    mounted() {
//      axios
//        .get('/countries')
//        .then((response) => {
//          console.log(response)
//        })
//        .catch(error => {
//          this.generalError = "Something went wrong, pls try again"
//        })
//    },
  computed: {
    error: function () {
      var error = {};
      forEach(this.task, (value, key) => {
        const field = find(this.fields, ['name', key]);
        error[key] = field && field.required && !value
      });
      return error
    }
  },
  methods: {
    submit: function () {
      this.submited = true;
      this.message = '';

      const isValid = !find(this.error, (error, index) => !!error);

      if (isValid) {
        console.log('go');
        axios
          .post('/tasks')
          .then(response => {
            this.message = 'success';
          })
          .catch(error => {
            console.log(error);
            this.message = 'error';
          })
      }
    }
  }
}
</script>
