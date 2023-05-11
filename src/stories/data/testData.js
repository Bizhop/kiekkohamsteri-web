export const testMolds = [
  {
    id: 994,
    manufacturer: {
      id: 1,
      name: 'ABC Discs'
    },
    name: 'Bee Line',
    speed: 13,
    glide: 6,
    stability: -2,
    fade: 2
  },
  {
    id: 995,
    manufacturer: {
      id: 1,
      name: 'ABC Discs'
    },
    name: 'Flying Squirrel',
    speed: 4,
    glide: 5,
    stability: -4,
    fade: 1
  },
  {
    id: 996,
    manufacturer: {
      id: 1,
      name: 'ABC Discs'
    },
    name: 'Gamma Ray',
    speed: 9,
    glide: 4,
    stability: -2,
    fade: 2
  },
  {
    id: 997,
    manufacturer: {
      id: 1,
      name: 'ABC Discs'
    },
    name: 'Mission',
    speed: 4,
    glide: 4,
    stability: -1,
    fade: 2
  },
  {
    id: 998,
    manufacturer: {
      id: 1,
      name: 'ABC Discs'
    },
    name: 'Money',
    speed: 2,
    glide: 3,
    stability: 0,
    fade: 2
  },
  {
    id: 999,
    manufacturer: {
      id: 1,
      name: 'ABC Discs'
    },
    name: 'Secret Weapon',
    speed: 9,
    glide: 4,
    stability: -3,
    fade: 2
  },
  {
    id: 1000,
    manufacturer: {
      id: 2,
      name: 'Aerobie'
    },
    name: 'Arrow',
    speed: 3,
    glide: 2,
    stability: 0,
    fade: 2
  },
  {
    id: 1001,
    manufacturer: {
      id: 2,
      name: 'Aerobie'
    },
    name: 'Epic',
    speed: 10,
    glide: 3,
    stability: -2,
    fade: 4
  },
  {
    id: 1002,
    manufacturer: {
      id: 2,
      name: 'Aerobie'
    },
    name: 'Sharpshooter #1',
    speed: 7,
    glide: 3,
    stability: 0,
    fade: 3
  },
  {
    id: 1003,
    manufacturer: {
      id: 2,
      name: 'Aerobie'
    },
    name: 'Sharpshooter #2',
    speed: 4,
    glide: 3,
    stability: 0,
    fade: 3
  }
]

export const testDisc = {
  "uuid": "7de5f419-9034-4a00-ba00-b89268691f13",
  "owner": {
    "username": "User",
    "email": "test@example.com"
  },
  "mold": {
    "id": 0,
    "manufacturer": {
      "id": 0,
      "name": "Discmania"
    },
    "name": "FD",
    "speed": 7,
    "glide": 6,
    "stability": -1,
    "fade": 1
  },
  "plastic": {
    "id": 0,
    "manufacturer": {
      "id": 0,
      "name": "Discmania"
    },
    "name": "S-Line"
  },
  "color": {
    "id": 0,
    "name": "Valkoinen"
  },
  "image": "No-Image",
  "weight": 175,
  "condition": 10,
  "glow": false,
  "special": true,
  "dyed": true,
  "swirly": false,
  "markings": 1,
  "forSale": false,
  "price": 0,
  "description": "Kuvaus",
  "lostAndFound": false,
  "itb": false,
  "publicDisc": true,
  "lost": false,
  "updatedAt": "2023-04-01"
}

export const testUser = {
  id: 1,
  email: "testman@example.com",
  username: "TestMan",
  firstName: "Test",
  lastName: "Man",
  pdgaNumber: 12345,
  groups: [{
    id: 1,
    name: "Test Group"
  }],
  roles: []
}

export const groupAdmin = {
  id: 2,
  email: "adminuser@example.com",
  username: "AdminUser",
  firstName: "Admin",
  lastName: "User",
  pdgaNumber: 54321,
  groups: [{
    id: 1,
    name: "Test Group"
  }],
  roles: [{
    id: 2,
    name: "GROUP_ADMIN",
    groupId: 1
  }]
}

export const testGroup = {
  id: 1,
  name: "Test Group"
}

export const groupRequests = [{
  id: 1,
  group: testGroup,
  source: testUser,
  target: groupAdmin,
  type: "DEMOTE"
}]

export const dropdowns = {
  "manufacturers": [
    {
      "value": 0,
      "name": "Discmania"
    },
    {
      "value": 1,
      "name": "Innova"
    },
    {
      "value": 2,
      "name": "Westside"
    }
  ],
  "molds": [
    {
      "value": 0,
      "name": "FD"
    },
    {
      "value": 1,
      "name": "PD"
    },
    {
      "value": 10,
      "name": "Destroyer"
    },
    {
      "value": 11,
      "name": "Roc"
    },
    {
      "value": 20,
      "name": "Harp"
    },
    {
      "value": 21,
      "name": "Hatchet"
    }
  ],
  "plastics": [
    {
      "value": 0,
      "name": "S-Line"
    },
    {
      "value": 1,
      "name": "C-Line"
    },
    {
      "value": 10,
      "name": "Star"
    },
    {
      "value": 11,
      "name": "Champion"
    },
    {
      "value": 20,
      "name": "VIP"
    }
  ],
  "colors": [
    {
      "value": 0,
      "name": "Valkoinen"
    },
    {
      "value": 1,
      "name": "Keltainen"
    }
  ],
  "conditions": [
    {
      "value": 10,
      "name": "10/10"
    },
    {
      "value": 8,
      "name": "8/10"
    },
    {
      "value": 5,
      "name": "5/10"
    },
    {
      "value": 4,
      "name": "4/10"
    }
  ],
  "markings": [
    {
      "value": 0,
      "name": "Ei merkintöjä"
    }
  ]
}


export const supportedOperations = [
  {
    "field": "condition",
    "type": "number",
    "operations": [
      "GREATER_THAN",
      "GREATER_THAN_EQUAL",
      "LESS_THAN",
      "LESS_THAN_EQUAL",
      "EQUAL",
      "NOT_EQUAL",
      "IN",
      "NOT_IN"
    ]
  },
  {
    "field": "price",
    "type": "number",
    "operations": [
      "GREATER_THAN",
      "GREATER_THAN_EQUAL",
      "LESS_THAN",
      "LESS_THAN_EQUAL",
      "EQUAL",
      "NOT_EQUAL",
      "IN",
      "NOT_IN"
    ]
  },
  {
    "field": "weight",
    "type": "number",
    "operations": [
      "GREATER_THAN",
      "GREATER_THAN_EQUAL",
      "LESS_THAN",
      "LESS_THAN_EQUAL",
      "EQUAL",
      "NOT_EQUAL",
      "IN",
      "NOT_IN"
    ]
  },
  {
    "field": "publicDisc",
    "type": "boolean",
    "operations": [
      "EQUAL"
    ]
  },
  {
    "field": "forSale",
    "type": "boolean",
    "operations": [
      "EQUAL"
    ]
  },
  {
    "field": "swirly",
    "type": "boolean",
    "operations": [
      "EQUAL"
    ]
  },
  {
    "field": "itb",
    "type": "boolean",
    "operations": [
      "EQUAL"
    ]
  },
  {
    "field": "lostAndFound",
    "type": "boolean",
    "operations": [
      "EQUAL"
    ]
  },
  {
    "field": "dyed",
    "type": "boolean",
    "operations": [
      "EQUAL"
    ]
  },
  {
    "field": "special",
    "type": "boolean",
    "operations": [
      "EQUAL"
    ]
  }
]
