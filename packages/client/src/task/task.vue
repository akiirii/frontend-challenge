<template>
  <div>
    <div class="page-load-error" v-if="generalError">{{generalError}}</div>

    <div class="task" v-if="!generalError">
      <h1>Task</h1>

      <div class="message" :class="{error: submitError}" v-if="message">{{message}}</div>

      <div class="field" :class="{error : error[field.name] && submited}" v-for="field in fields" :key="field.name">

        <label v-if="field.type !== 'datepicker'">{{field.label}}</label>

        <input v-if="field.type === 'input'" v-model="task[field.name]"/>

        <v-select
          v-if="field.type === 'select'"
          v-model="task[field.name]"
          :options="options[field.name]"
          label="name"
        />

        <datetime v-if="field.type === 'datepicker'" type="datetime" v-model="task[field.name]">
          <label slot="before">{{field.label}}</label>
        </datetime>

        <div class="error-message" v-if="error[field.name] && submited">This field is reqiured</div>
      </div>

      <button v-on:click="submit">Save</button>

    </div>

  </div>
</template>


<script>
  import axios from 'axios'
  import { forEach, find, omit } from 'lodash'
  import './task.less'

  export default {
    name: 'Form',
    props: {
      fields: Array
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
          deliveryAt: ''
        },
        options: {
          country: []
        },
        submited: false,
        submitError: false,
        message: '',
        generalError: ''
      }
    },
    mounted() {
      axios
        .get('/countries')
        .then((response) => {
          this.options.country = response.data
        })
        .catch(error => {
          this.generalError = 'Something went wrong, pls try again'
        })
    },
    computed: {
      error: function () {
        var error = {}
        forEach(this.task, (value, key) => {
          const field = find(this.fields, ['name', key])
          error[key] = field && field.required && !value
        })
        return error
      }
    },
    methods: {
      parseData: function (data) {
        return {
          recipient: {
            ...omit(data, 'deliveryAt'),
            country: data.country.id
          },
          delivery_at: data.deliveryAt
        }
      },
      submit: function () {
        this.submited = true
        this.message = ''
        this.submitError = false

        const isValid = !find(this.error, (error, index) => !!error)

        if (isValid) {
          axios
            .post('/tasks', this.parseData(this.task))
            .then(response => {
              this.message = 'Your task is successfully saved'
            })
            .catch(error => {
              this.message = error
              this.submitError = true
            })
        }
      }
    }
  }
</script>
