<template lang="html">
  <div id="example">
    <zk-table
      ref="table"
      :data="data"
      :columns="columns"
      :stripe="true"
      :border="false"
      :show-header="true"
      :show-summary="false"
      :show-row-hover="true"
      :expandType="true"
      :selectionType="true"
      @row-mouseenter="rowMouseenter"
      @row-mouseleave="rowMouseleave"
      @cell-click="cellClick">
      <template slot="$expand" scope="scope">
        'ssss'
      </template>
      <template slot="likes" scope="scope">
        {{ scope.row.likes.join(',') }}
      </template>
    </zk-table>
  </div>
</template>

<script>

  export default {
    name: 'example',
    data() {
      return {
        checked: false,
        expand: true,
        data: [
          {
            name: '高琦1',
            sex: '男',
            likes: ['足球', '篮球'],
            score: 10,
            children: [
              {
                name: 'sss1',
                sex: '男',
                likes: ['足球', '篮球'],
                score: 20,
                children: [
                  {
                    name: 'sss1',
                    sex: '男',
                    likes: ['足球', '篮球'],
                    score: 20,
                  },
                  {
                    name: 'sss2',
                    sex: '男',
                    likes: ['足球', '篮球'],
                    score: 10,
                    children: [
                      {
                        name: 'sss1',
                        sex: '男',
                        likes: ['足球', '篮球'],
                        score: 20,
                      },
                      {
                        name: 'sss2',
                        sex: '男',
                        likes: ['足球', '篮球'],
                        score: 10,
                        children: [
                          {
                            name: 'sss1',
                            sex: '男',
                            likes: ['足球', '篮球'],
                            score: 20,
                          },
                          {
                            name: 'sss2',
                            sex: '男',
                            likes: ['足球', '篮球'],
                            score: 10,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'sss2',
                sex: '男',
                likes: ['足球', '篮球'],
                score: 10,
              },
            ],
          },
          {
            name: '高琦2',
            sex: '男',
            likes: ['LOL', '农药'],
            score: 20,
            children: [
              {
                name: 'sss1',
                sex: '男',
                likes: ['足球', '篮球'],
                score: 20,
                children: [
                  {
                    name: 'sss1',
                    sex: '男',
                    likes: ['足球', '篮球'],
                    score: 20,
                  },
                  {
                    name: 'sss2',
                    sex: '男',
                    likes: ['足球', '篮球'],
                    score: 10,
                  },
                ],
              },
              {
                name: 'sss2',
                sex: '男',
                likes: ['足球', '篮球'],
                score: 10,
                children: [
                  {
                    name: 'sss1',
                    sex: '男',
                    likes: ['足球', '篮球'],
                    score: 20,
                  },
                  {
                    name: 'sss2',
                    sex: '男',
                    likes: ['足球', '篮球'],
                    score: 10,
                  },
                ],
              },
            ],
          },
          {
            name: '高琦2',
            sex: '男',
            likes: ['LOL', '农药'],
            score: 20,
          },
          {
            name: '高琦2',
            sex: '男',
            likes: ['LOL', '农药'],
            score: 20,
            children: [
              {
                name: 'sss1',
                sex: '男',
                likes: ['足球', '篮球'],
                score: 20,
              },
              {
                name: 'sss2',
                sex: '男',
                likes: ['足球', '篮球'],
                score: 10,
              },
            ],
          },
        ],
        columns: [
          {
            label: '姓名',
            prop: 'name',
            minWidth: '200px',
          },
          {
            label: '性别',
            prop: 'sex',
            minWidth: '300px',
          },
          {
            label: '分数',
            prop: 'score',
            minWidth: '300px',
          },
          {
            label: '喜欢的',
            prop: 'likes',
            type: 'template',
            template: 'likes',
            minWidth: '300px',
          },
          {
            label: '操作',
            type: 'template',
            template: 'operation',
            minWidth: '300px',
          },
        ],
      };
    },
    methods: {
      rowMouseenter() {
      },
      rowMouseleave() {
      },
      cellClick() {
      },
    },
  };
</script>

<style lang="less">

</style>
