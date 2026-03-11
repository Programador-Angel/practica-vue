import { createRouter, createWebHashHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import QueEsView from '../views/QueEsView.vue'
import TiposView from '../views/TiposView.vue'
import OperadoresView from '../views/OperadoresView.vue'
import FuncionesView from '../views/FuncionesView.vue'
import ConversionView from '../views/ConversionView.vue'
import VariablesView from '../views/VariablesView.vue'
import IoView from '../views/IoView.vue'
import ControlView from '../views/ControlView.vue'
import ObjetosView from '../views/ObjetosView.vue'
import ReferenciasView from '../views/ReferenciasView.vue'
import PrivacidadView from '../views/PrivacidadView.vue'

const routes = [
  { path: '/', name: 'inicio', component: InicioView },
  { path: '/que-es', name: 'que-es', component: QueEsView },
  { path: '/tipos', name: 'tipos', component: TiposView },
  { path: '/operadores', name: 'operadores', component: OperadoresView },
  { path: '/funciones', name: 'funciones', component: FuncionesView },
  { path: '/conversion', name: 'conversion', component: ConversionView },
  { path: '/variables', name: 'variables', component: VariablesView },
  { path: '/io', name: 'io', component: IoView },
  { path: '/control', name: 'control', component: ControlView },
  { path: '/objetos', name: 'objetos', component: ObjetosView },
  { path: '/referencias', name: 'referencias', component: ReferenciasView },
  { path: '/privacidad', name: 'privacidad', component: PrivacidadView }
]

const router = createRouter({
 history: createWebHashHistory(),
  routes
})

export default router