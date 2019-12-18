/*
Tree example
    0      1      2
---------------------------
0|  code_1
1|        code_2
2|              code_3
3|              code_4
4|  code_5
*/
export const parsingTree =  [
  {
      "category_id": "a72bdcce-6bd6-5663-99ae-7bad19307aa6",
      "childrens": [
          {
              "category_id": "4c59d19f-e569-576b-a67f-e2d2094b19f5",
              "childrens": [
                  {
                      "category_id": "fb471778-cbe7-56ca-ace7-0edd936092d7",
                      "childrens": []
                  },
                  {
                      "category_id": "f9e4f5a5-7a87-5efc-a680-cfbdb68b869f",
                      "childrens": []
                  },
              ]
          },
      ]
  },
  {
      "category_id": "b07154ca-3e19-5d69-9238-8fe2b0c5e49e",
      "childrens": []
  }
];

export const mappingTree = [
  {
      id: "a72bdcce-6bd6-5663-99ae-7bad19307aa6",
      code: "code_1",
      column: 0,
      row: 0,
      children: 1,
      expanded: false,
      name: null,
      parent: "root",
  },
  {
      id: "4c59d19f-e569-576b-a67f-e2d2094b19f5",
      code: "code_2",
      column: 1,
      row: 1,
      children: 2,
      expanded: false,
      name: null,
      parent: "a72bdcce-6bd6-5663-99ae-7bad19307aa6",
  },
  {
      id: "fb471778-cbe7-56ca-ace7-0edd936092d7",
      code: "code_3",
      column: 2,
      row: 2,
      children: 0,
      expanded: false,
      name: null,
      parent: "4c59d19f-e569-576b-a67f-e2d2094b19f5",
  },
  {
      id: "f9e4f5a5-7a87-5efc-a680-cfbdb68b869f",
      code: "code_4",
      column: 2,
      row: 3,
      children: 0,
      expanded: false,
      name: null,
      parent: "4c59d19f-e569-576b-a67f-e2d2094b19f5",
  },
  {
      id: "b07154ca-3e19-5d69-9238-8fe2b0c5e49e",
      code: "code_5",
      column: 0,
      row: 4,
      children: 0,
      expanded: false,
      name: null,
      parent: "root",
  },
];

export const hiddenItems = [
    {
        id: "fb471778-cbe7-56ca-ace7-0edd936092d7",
        code: "code_3",
        column: 2,
        row: 2,
        children: 0,
        expanded: false,
        name: null,
        parent: "4c59d19f-e569-576b-a67f-e2d2094b19f5",
    },
    {
        id: "f9e4f5a5-7a87-5efc-a680-cfbdb68b869f",
        code: "code_4",
        column: 2,
        row: 3,
        children: 0,
        expanded: false,
        name: null,
        parent: "4c59d19f-e569-576b-a67f-e2d2094b19f5",
    },
];
