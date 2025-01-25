export const MOCKS_TRANSACTION_CATEGORY = [
    {
        "category": "SALARY",
        "total": 4476.92,
        "percent": 40.69
    },
    {
        "category": "UTILITY",
        "total": 2812.51,
        "percent": 25.56
    },
    {
        "category": "FOOD",
        "total": 2441.32,
        "percent": 22.19
    },
    {
        "category": "HOUSING",
        "total": 1271.38,
        "percent": 11.56
    },
    {
      "category": "ENTERTAINMENT",
      "total": 1271.38,
      "percent": 11.56
  }
]

export const MOCKS_TRANSACTIONS = [
    {
        "id": 50,
        "type": "EXPENSE",
        "name": "Estacionamento",
        "amount": 150.0,
        "category": {
            "id": 2,
            "name": "TRANSPORTATION"
        },
        "date": "2025-01-22T03:00:00Z",
        "createdAt": "2025-01-22T17:54:03.115818Z",
        "updatedAt": "2025-01-22T17:54:03.115833Z",
        "paymentMethod": {
            "id": 2,
            "name": "DEBIT_CARD"
        },
        "userId": "google-oauth2|107023432690562050443"
    },
    {
        "id": 44,
        "type": "DEPOSIT",
        "name": "Pagamento de conta de gás",
        "amount": 2000.0,
        "category": {
            "id": 6,
            "name": "UTILITY"
        },
        "date": "2024-12-07T03:00:00Z",
        "createdAt": "2024-12-07T13:20:23.027822Z",
        "updatedAt": "2024-12-07T13:20:23.027854Z",
        "paymentMethod": {
            "id": 3,
            "name": "BANK_TRANSFER"
        },
        "userId": "google-oauth2|107023432690562050443"
    },
    {
        "id": 43,
        "type": "DEPOSIT",
        "name": "Pagamento de freelance",
        "amount": 3500.0,
        "category": {
            "id": 7,
            "name": "SALARY"
        },
        "date": "2024-12-07T03:00:00Z",
        "createdAt": "2024-12-07T13:18:56.65274Z",
        "updatedAt": "2024-12-07T13:18:56.652818Z",
        "paymentMethod": {
            "id": 3,
            "name": "BANK_TRANSFER"
        },
        "userId": "google-oauth2|107023432690562050443"
    },
    {
        "id": 42,
        "type": "DEPOSIT",
        "name": "Pedido de comida online",
        "amount": 150.75,
        "category": {
            "id": 3,
            "name": "FOOD"
        },
        "date": "2024-12-03T03:00:00Z",
        "createdAt": "2024-12-04T22:13:12.802589Z",
        "updatedAt": "2024-12-04T22:13:12.802615Z",
        "paymentMethod": {
            "id": 1,
            "name": "CREDIT_CARD"
        },
        "userId": "google-oauth2|107023432690562050443"
    },
    {
        "id": 41,
        "type": "EXPENSE",
        "name": "Compra de supermercado",
        "amount": 25.0,
        "category": {
            "id": 3,
            "name": "FOOD"
        },
        "date": "2024-12-04T03:00:00Z",
        "createdAt": "2024-12-04T22:12:30.62056Z",
        "updatedAt": "2024-12-04T22:12:30.620576Z",
        "paymentMethod": {
            "id": 2,
            "name": "DEBIT_CARD"
        },
        "userId": "google-oauth2|107023432690562050443"
    },
    {
        "id": 40,
        "type": "DEPOSIT",
        "name": "Compra de supermercado",
        "amount": 25.0,
        "category": {
            "id": 3,
            "name": "FOOD"
        },
        "date": "2024-12-04T03:00:00Z",
        "createdAt": "2024-12-04T22:11:57.403688Z",
        "updatedAt": "2024-12-04T22:11:57.40374Z",
        "paymentMethod": {
            "id": 3,
            "name": "BANK_TRANSFER"
        },
        "userId": "google-oauth2|107023432690562050443"
    },
    {
        "id": 39,
        "type": "EXPENSE",
        "name": "Pedido de comida online",
        "amount": 150.75,
        "category": {
            "id": 3,
            "name": "FOOD"
        },
        "date": null,
        "createdAt": "2024-12-04T21:28:19.654956Z",
        "updatedAt": "2024-12-04T21:28:19.655014Z",
        "paymentMethod": {
            "id": 4,
            "name": "BANK_SLIP"
        },
        "userId": "google-oauth2|107023432690562050443"
    },
    {
        "id": 38,
        "type": "EXPENSE",
        "name": "Pedido de comida online",
        "amount": 150.75,
        "category": {
            "id": 3,
            "name": "FOOD"
        },
        "date": null,
        "createdAt": "2024-12-04T17:24:41.787951Z",
        "updatedAt": "2024-12-04T17:24:41.787999Z",
        "paymentMethod": {
            "id": 5,
            "name": "CASH"
        },
        "userId": "google-oauth2|107023432690562050443"
    },
    {
        "id": 37,
        "type": "DEPOSIT",
        "name": "Compra de supermercado",
        "amount": 250.0,
        "category": {
            "id": 3,
            "name": "FOOD"
        },
        "date": "2024-12-03T03:00:00Z",
        "createdAt": "2024-12-04T02:11:10.891274Z",
        "updatedAt": "2024-12-04T02:11:10.891317Z",
        "paymentMethod": {
            "id": 6,
            "name": "PIX"
        },
        "userId": "google-oauth2|107023432690562050443"
    },
    {
        "id": 35,
        "type": "INVESTMENT",
        "name": "Compra de ações",
        "amount": 856.62,
        "category": {
            "id": 7,
            "name": "SALARY"
        },
        "date": "2024-08-07T03:00:00Z",
        "createdAt": null,
        "updatedAt": null,
        "paymentMethod": {
            "id": 3,
            "name": "BANK_TRANSFER"
        },
        "userId": "google-oauth2|107023432690562050443"
    },
    {
        "id": 34,
        "type": "DEPOSIT",
        "name": "Pagamento de conta de internet",
        "amount": 812.51,
        "category": {
            "id": 6,
            "name": "UTILITY"
        },
        "date": "2024-03-29T03:00:00Z",
        "createdAt": null,
        "updatedAt": null,
        "paymentMethod": {
            "id": 8,
            "name": "CRIPTO"
        },
        "userId": "google-oauth2|107023432690562050443"
    },
    {
        "id": 33,
        "type": "INVESTMENT",
        "name": "Plano de saúde",
        "amount": 363.05,
        "category": {
            "id": 5,
            "name": "HEALTH"
        },
        "date": "2024-08-20T03:00:00Z",
        "createdAt": null,
        "updatedAt": null,
        "paymentMethod": {
            "id": 6,
            "name": "PIX"
        },
        "userId": "google-oauth2|107023432690562050443"
    }
]