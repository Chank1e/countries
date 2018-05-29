<template>
  <div>

    <div class="ui form">
      <div class="two fields">
        <div class="field">
          <label>Region</label>
          <input type="text" placeholder="Type region" v-model="region">
        </div>
        <div class="field">
          <label>Subregion</label>
          <input type="text" placeholder="Type sub-region" v-model="subregion">
        </div>
      </div>
    </div>
    <button class="ui primary button" @click="getCountries(true)">
      Update
    </button>
    <button class="ui button" @click="resetSorting">
      Reset sorting
    </button>
    <h4>
      Total found: {{meta.total}}
    </h4>
    <table class="ui celled table sortable">
      <thead>
        <tr>
          <th :class="{'sorted':sort.field=='name',
                       'ascending':sort.field=='name'&&sort.type=='asc',
                       'descending':sort.field=='name'&&sort.type=='desc'}" @click="setSort('name')">
            Name
          </th>
          <th>Capital</th>
          <th>Region</th>
          <th>Subregion</th>
          <th :class="{'sorted':sort.field=='population',
                       'ascending':sort.field=='population'&&sort.type=='asc',
                       'descending':sort.field=='population'&&sort.type=='desc'}" @click="setSort('population')">
            Population
          </th>
          <th>Domains</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in countries" :key="country.id">
          <td>{{country.attributes.name}}</td>
          <td>{{country.attributes.capital}}</td>
          <td>{{country.attributes.region}}</td>
          <td>{{country.attributes.sub_region}}</td>
          <td>{{country.attributes.population}}</td>
          <td>{{country.attributes.top_level_domains.join(',')}}</td>
          <td>
            <button class="ui primary button" @click="showMore(country.id)">
              More...
            </button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="7">
            <div class="ui right floated pagination menu">
              <a class="item" @click="changePage('first')">First</a>
              <a class="icon item" @click="changePage('prev')">
                <i class="left chevron icon"></i>
              </a>
              <a class="item">Current:
                <b>{{page}}</b>
              </a>
              <a class="icon item" @click="changePage('next')">
                <i class="right chevron icon"></i>
              </a>
              <a class="item" @click="changePage('last')">Last</a>
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';
  export default {
    data: () => ({
      sort: {
        type: 'asc',
        field: ''
      }
    }),
    mounted() {
      this.getCountries();
    },
    methods: {
      changePage(page) {
        this.$store.dispatch('changePage', page);
      },
      showMore(id) {
        this.$store.dispatch('openMorePage', id);
      },
      getCountries(first_page) {
        if(first_page){
          this.$store.dispatch('changePage','first');
          return ;
        }
        this.$store.dispatch('getCountries');
      },
      resetSorting() {
        this.sort.type = '';
        this.sort.field = '';
        this.$store.dispatch('resetSorting');
      },
      setSort(field) {
        if (field === this.sort.field)
          this.sort.type = this.sort.type === 'asc' ? 'desc' : 'asc';
        else
          this.sort.field = field;
        this.$store.dispatch('sortCountries', this.sort)
      }
    },
    computed: {
      ...mapFields([
        'countries',
        'filters.region',
        'filters.subregion',
        'page',
        'meta'
      ]),
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
