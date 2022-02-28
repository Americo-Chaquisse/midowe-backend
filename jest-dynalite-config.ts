process.env['STAGE_NAME'] = 'test';
process.env['AWS_REGION'] = 'local';

const dummyData = [
  {
    pk: 'category',
    sk: 'educacao',
    updated: 1645703956860,
    created: 1645703956860,
    description: 'Educação / Formação / Cursos',
    id: 'educacao',
    name: 'Educação',
    _type: 'Category',
  },
  {
    pk: 'category',
    sk: 'nascimento',
    updated: 1645703872515,
    created: 1645703872515,
    description: 'Nascimento / Bebe / Aniversário',
    id: 'nascimento',
    name: 'Nascimento',
    _type: 'Category',
  },
  {
    pk: 'category',
    sk: 'contribuicao',
    updated: 1645703956860,
    created: 1645703956860,
    description: 'Contribuição / Outros / Dinheiro',
    id: 'contribuicao',
    name: 'Contribuição',
    _type: 'Category',
  },
];

export default {
  tables: [
    {
      TableName: `MidoweTable`,
      KeySchema: [
        { AttributeName: 'pk', KeyType: 'HASH' },
        { AttributeName: 'sk', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'pk', AttributeType: 'S' },
        { AttributeName: 'sk', AttributeType: 'S' },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      data: dummyData,
    },
  ],
  basePort: 8000,
};
