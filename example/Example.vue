<template lang="html">
  <div id="example">
    <zk-table
      ref="table"
      sum-text="sum"
      index-text="#"
      :data="data"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :tree-type="props.treeType"
      :is-fold="props.isFold"
      :expand-type="false"
      :max-height="400"
      emptyText="No se han encontrado resultados"
      :selection-type="false">
      <template slot="name" scope="scope">
        <b>{{ scope.row.name }}</b>
      </template>
      <template slot="actions" scope="scope">
        <div class="text-center">
          <button>+</button>
          <button v-tooltip="{content: 'Editar'}">Editar</button>
          <button>Editar</button>
          <button v-if="scope.row._level > 1">Eliminar</button>
        </div>
      </template>
    </zk-table>
  </div>
</template>

<script>
class TrainingPlan {
  constructor(
    id,
    name,
    startDate,
    endDate,
    totalVacancies,
    totalReserved,
    totalNumberOfHours,
    totalInitialBudget,
    coordinador,
    state,
    ) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.totalVacancies = totalVacancies;
    this.totalReserved = totalReserved;
    this.totalNumberOfHours = totalNumberOfHours;
    this.totalInitialBudget = totalInitialBudget;
    this.coordinador = coordinador;
    this.coordinador = coordinador;
    this.state = state;
  }
  setChildren(children) {
    if (!this.children) this.children = [];
    this.children.push(children);
  }
}

export default {
  name: 'example',
  data() {
    return {
      props: {
        stripe: true,
        border: true,
        showHeader: true,
        showSummary: false,
        treeType: true,
        isFold: false,
      },
      data: [],
      columns: [
        {
          prop: 'name',
          label: 'Nombre',
          width: '350',
          tooltip: true,
        },
        {
          prop: 'coordinador',
          label: 'Coordinador',
        },
        {
          prop: 'startDate',
          label: 'F. Inicio',
          type: 'template',
          template: 'startDate',
        },
        {
          prop: 'endDate',
          label: 'F. Fin',
          type: 'template',
          template: 'endDate',
        },
        {
          prop: 'state',
          label: 'Estado',
        },
        {
          prop: 'totalInitialBudget',
          label: 'P. inicial',
        },
        {
          prop: 'totalNumberOfHours',
          label: 'Horas',
          width: '80',
        },
        {
          prop: 'totalReserved',
          label: 'P. reservadas',
        },
        {
          prop: 'totalVacancies',
          label: 'P. totales',
        },
        {
          prop: 'actions',
          label: 'Acciones',
          type: 'template',
          template: 'actions',
        },
      ],
    };
  },
  created() {
    fetch('http://localhost:3000/data')
      .then(data => data.json())
      .then((res) => {
        this.data.push(this.buildTreeView(res, 1, null));
      });
  },
  methods: {
    buildTreeView(node, curentLevel, nameVersion) {
      const level = new TrainingPlan(
        node.id,
        nameVersion || node.name,
        node.startDate,
        node.endDate,
        node.totalVacancies,
        node.totalReserved,
        node.totalNumberOfHours,
        node.totalInitialBudget,
        node.coordinador,
        node.state,
      );
      let levelName;
      if (curentLevel === 1) levelName = 'moduleVersion';
      if (curentLevel === 2) levelName = 'submoduleVersion';
      if (curentLevel === 3) levelName = 'trainingActivityVersion';
      if (curentLevel === 4) levelName = 'editionVersion';
      if (curentLevel <= 4) {
        node[levelName].forEach((element) => {
          level.setChildren(
            this.buildTreeView(element, curentLevel + 1, curentLevel === 4 ? node.name : null),
            );
        });
      }
      return level;
    },
  },
};
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}

.switch-list {
  margin: 20px 0;
  list-style: none;
  overflow: hidden;
}

.switch-item {
  margin: 20px;
  float: left;
}
</style>
