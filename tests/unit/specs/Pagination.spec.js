/**
 * Creado por: Javier Granda Ruiz
 * Fecha: 11/08/2018 - 15:49
 * Fichero: Pagination.spec.js
 * Proyecto: vue-bulma-paginate
 * Editor: PhpStorm.
 */

import { mount, createLocalVue } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';

const $route = {
  fullPath: 'full/path',
};
const wrapper = mount(Pagination, {
  mocks: {
    $route,
    stubs: ['router-link', 'router-view'],
  },
});

describe('Pagination.vue', () => {
  it('Espera datos iniciales válidos', () => {
    wrapper.setProps({
      buttonsMax: 5,
      itemsPerPage: 3,
      itemsTotal: 7,
    });

    expect(wrapper.vm.buttonsMax).toBe(5);
    expect(wrapper.vm.itemsPerPage).toBe(3);
    expect(wrapper.vm.itemsTotal).toBe(7);
    expect(wrapper.vm.pagesTotal).toBe(3);
    expect(wrapper.vm.buttonsTotal).toBe(3);
  });

  it('No muestra la paginación cuando no es necesaria', () => {
    wrapper.setProps({
      buttonsMax: 5,
      itemsPerPage: 3,
      itemsTotal: 3,
    });

    expect(wrapper.vm.buttons).toEqual([1]);
    expect(wrapper.vm.showPagination).toBe(false);
  });

  it('Muestra la paginación cuando no es necesaria', () => {
    wrapper.setProps({
      buttonsMax: 5,
      itemsPerPage: 3,
      itemsTotal: 4,
    });

    expect(wrapper.vm.buttons).toEqual([1, 2]);
    expect(wrapper.vm.showPagination).toBe(true);
  });

  it('El botón Anterior funciona correctamente', () => {
    wrapper.setProps({
      buttonsMax: 5,
      itemsPerPage: 3,
      itemsTotal: 4,
      currentPage: 2,
    });

    expect(wrapper.vm.buttons).toEqual([1, 2]);
    expect(wrapper.vm.showPagination).toBe(true);

    console.log(wrapper.vm.$route.fullPath);
  });

  it('Caso de uso 2: Una gran cantidad de Elementos', () => {
    wrapper.setProps({
      buttonsMax: 5,
      itemsPerPage: 20,
      itemsTotal: 7842,
    });

    expect(wrapper.vm.pagesTotal).toBe(393);
    expect(wrapper.vm.buttonsTotal).toBe(3);
  });

  it('Caso de uso 3: Una baja cantidad de Elementos', () => {
    wrapper.setProps({
      buttonsMax: 5,
      itemsPerPage: 3,
      itemsTotal: 10,
      currentPage: 4,
    });

    expect(wrapper.vm.pagesTotal).toBe(4);
    expect(wrapper.vm.buttonsTotal).toBe(3);
    expect(wrapper.vm.buttons).toEqual([2, 3, 4]);
  });
});
