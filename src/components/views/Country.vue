<template>
  <div class="ui items">
    <div class="item">
      <div class="ui small image">
        <img src="http://via.placeholder.com/200x200">
      </div>
      <div class="content">
        <div class="header">{{name}}</div>
        <div class="meta">
          <span class="price"><i>ID:</i> {{id}}</span>
          <span class="stay"><i>Phone:</i> +{{calling_codes.join(',')}}</span>
        </div>
        <div class="description">
          <p>
              <b>Area:</b> {{area}}
          </p>
          <p>
              <b>Capital:</b> {{capital}}
          </p>
          <p>
              <b>Languages:</b> {{languages.join(',')}}
          </p>
          <p>
              <b>Population:</b> {{population}}
          </p>
          <p>
              <b>Region:</b> {{region}}({{sub_region}})
          </p>
          <p>
              <b>Timezones:</b> {{timezones.join(',')}}
          </p>
          <p>
              <b>Domains:</b> {{top_level_domains.join(',')}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
export default {
    mounted() {
        console.log('COUNTRY ', this.$route.params)
    },
    computed:{
        ...mapFields([
            'currentCountry.attributes.area',
            'currentCountry.attributes.calling_codes',
            'currentCountry.attributes.capital',
            'currentCountry.attributes.languages',
            'currentCountry.attributes.name',
            'currentCountry.attributes.population',
            'currentCountry.attributes.region',
            'currentCountry.attributes.sub_region',
            'currentCountry.id',
            'currentCountry.attributes.timezones',
            'currentCountry.attributes.top_level_domains'
        ])
    }
}

</script>

<style>


</style>
