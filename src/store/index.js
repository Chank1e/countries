import Vue from 'vue';
import VueX from 'vuex';
import * as TYPES from './mutation_types';
import axios from 'axios';
import { getField, updateField } from 'vuex-map-fields';
import router from '../router';



const API_PATH = 'https://api.openfintech.io' 

Vue.use(VueX);


export default new VueX.Store({
  state: {
    sort:{
        type:'',
        field:''
    },
    meta:{
        pages:-1,
        total:-1
    },
    filters:{
        region:'',
        subregion:''
    },
    page:1,
    pageSize:20,
    countries:[],
    currentCountry:{},
    links:{
        first:'',
        last:'',
        next:'',
        prev:''
    }
  },
  mutations: {
      [TYPES.SET_COUNTRIES](state,countries){
        if(countries)
            state.countries = countries;
      },
      [TYPES.SET_CURRENT_COUNTRY](state,country){
        if(country)
            state.currentCountry = country;
      },
      [TYPES.SET_SORT](state,sort){
        let {type, field} = sort
        if(type)
            state.sort.type = type;
        if(field)
            state.sort.field = field;
      },
      [TYPES.UPDATE_LINKS](state,links){
        let { prev, next, last, first} = links;
        if(prev)
            state.links.prev = prev;
        if(next)
            state.links.next = next;
        if(last)
            state.links.last = last;
        if(first)
            state.links.first = first;
      },
      [TYPES.SET_META](state,obj){
        let {pages, total} = obj;
        if(pages)
            state.meta.pages = pages;
        if(total||total==0)
            state.meta.total = total;
      },
      [TYPES.RESET_SORT](state){
        state.sort.type = '';
        state.sort.field = '';
      },
      [TYPES.UPDATE_PAGE](state,page){
        if(page==='next')
            state.page++;
        else if(page==='prev')
            state.page--;
        else if(page==='last')
            state.page = state.meta.pages;
        else if(page==='first')
            state.page = 1;
      },
      updateField
  },
  actions:{
      getCountries({commit, state},str){
        let params_str;
        const default_params = `/v1/countries?page[number]=${state.page}&page[size]=${state.pageSize}`;
        if(str==='next')
            params_str = state.links.next;
        else if(str==='prev')
            params_str = state.links.prev;
        else if(str==='first')
            params_str = state.links.first;
        else if(str==='last')
            params_str = state.links.last;
        else 
            params_str = default_params;

        if(params_str==='')
            params_str = default_params;

        if(state.filters.region)
            params_str+=`&filter[region]=${encodeURIComponent(state.filters.region)}`;
        if(state.filters.subregion)
            params_str+=`&filter[subregion]=${encodeURIComponent(state.filters.subregion)}`;
        
        if(state.sort.type!==''&&state.sort.field!=='')
            params_str+=`&sort=${state.sort.type=='desc'?'-':''}${state.sort.field}`;
        axios.get(`${API_PATH}${params_str}`)
            .then(res=>{
                commit(TYPES.SET_META,res.data.meta);
                commit(TYPES.UPDATE_LINKS,res.data.links);
                commit(TYPES.SET_COUNTRIES,res.data.data);
            })
            .catch(err=>{
                toastr.error(`Can't find countries`);
            })
      },
      changePage({commit, dispatch},page){
          if(page){
            commit(TYPES.UPDATE_PAGE,page);
            dispatch('getCountries',page);
          }
      },
      openMorePage({commit, state},id){
        // axios.get(`${API_PATH}/v1/countries/${id}`)
        //     .then(res=>{
        //         commit(TYPES.SET_CURRENT_COUNTRY,res.data.data);
        //     })
        //     .catch(err=>{
        //         toastr.error(`Can't find country`);
        //     })
        const country = state.countries.filter(_=>_.id===id);
        if(country.length==0){
            console.error('Not found');
        } else {
            commit(TYPES.SET_CURRENT_COUNTRY,country[0]);
            router.push(`/country/${id}`);
        }
        
      },
      sortCountries({dispatch,commit},sort){
          commit(TYPES.SET_SORT,sort);
          dispatch('getCountries','');
      },
      resetSorting({commit, dispatch}){
          commit(TYPES.RESET_SORT);
          dispatch('getCountries','')
      }
  },
  getters: {
    getField
  },
})