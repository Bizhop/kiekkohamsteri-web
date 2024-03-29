/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/v2/discs/{uuid}": {
    get: operations["getDisc"];
    put: operations["updateDisc"];
    delete: operations["deleteDisc"];
  };
  "/api/v2/groups": {
    get: operations["getGroups"];
    post: operations["createGroup"];
  };
  "/api/v2/groups/{groupId}/requests": {
    post: operations["registerGroupRequest"];
  };
  "/api/v2/groups/{groupId}/requests/{requestId}": {
    post: operations["completeRequest"];
  };
  "/api/v2/discs": {
    get: operations["getDiscs"];
    post: operations["createDisc"];
  };
  "/api/v2/discs/{uuid}/buy": {
    post: operations["buyDisc"];
  };
  "/api/v2/discs/search": {
    get: operations["supportedSearchOperations"];
    post: operations["search"];
  };
  "/api/v2/discs/plastics": {
    get: operations["getPlastics"];
    post: operations["createMuovi"];
  };
  "/api/v2/discs/molds": {
    get: operations["getMolds"];
    post: operations["createMold"];
  };
  "/api/v2/buys/{id}/reject": {
    post: operations["reject"];
  };
  "/api/v2/buys/{id}/confirm": {
    post: operations["confirm"];
  };
  "/api/rating": {
    post: operations["getRating"];
  };
  "/api/v2/user/{id}": {
    get: operations["getDetails"];
    patch: operations["updateDetails"];
  };
  "/api/v2/discs/{uuid}/update-image": {
    patch: operations["updateImage"];
  };
  "/api/v2/discs/{uuid}/found": {
    patch: operations["markFound"];
  };
  "/api/v2/user": {
    get: operations["getUsers"];
  };
  "/api/v2/user/me": {
    get: operations["getMe"];
  };
  "/api/v2/stats": {
    get: operations["getStats"];
  };
  "/api/v2/login": {
    get: operations["login"];
  };
  "/api/v2/groups/requests": {
    get: operations["getGroupRequests"];
  };
  "/api/v2/dropdowns": {
    get: operations["getDropdowns"];
  };
  "/api/v2/discs/lost": {
    get: operations["getLost"];
  };
  "/api/v2/discs/for-sale": {
    get: operations["getDiscsForSale"];
  };
  "/api/v2/buys": {
    get: operations["listing"];
  };
  "/api/v2/buys/own": {
    get: operations["summary"];
  };
  "/api/rating/{pdga}": {
    get: operations["getRounds"];
  };
  "/api/v2/groups/{groupId}": {
    delete: operations["deleteGroup"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    DiscInputDto: {
      /** Format: int64 */
      moldId?: number;
      /** Format: int64 */
      plasticId?: number;
      /** Format: int64 */
      colorId?: number;
      /** Format: int32 */
      weight?: number;
      /** Format: int32 */
      condition?: number;
      glow?: boolean;
      special?: boolean;
      dyed?: boolean;
      swirly?: boolean;
      /** Format: int32 */
      markings?: number;
      forSale?: boolean;
      /** Format: int32 */
      price?: number;
      description?: string;
      lostAndFound?: boolean;
      itb?: boolean;
      publicDisc?: boolean;
      lost?: boolean;
    };
    ColorOutputDto: {
      /** Format: int64 */
      id: number;
      name: string;
    };
    DiscOutputDto: {
      uuid: string;
      owner: components["schemas"]["UserOutputDto"];
      mold?: components["schemas"]["MoldOutputDto"];
      plastic?: components["schemas"]["PlasticOutputDto"];
      color: components["schemas"]["ColorOutputDto"];
      image: string;
      /** Format: int32 */
      weight?: number;
      /** Format: int32 */
      condition: number;
      glow?: boolean;
      special?: boolean;
      dyed: boolean;
      swirly: boolean;
      /** Format: int32 */
      markings: number;
      forSale?: boolean;
      /** Format: int32 */
      price: number;
      description?: string;
      lostAndFound?: boolean;
      itb: boolean;
      publicDisc: boolean;
      lost: boolean;
      /** Format: date-time */
      updatedAt: string;
    };
    GroupDto: {
      /** Format: int64 */
      id: number;
      name?: string;
    };
    ManufacturerOutputDto: {
      /** Format: int64 */
      id: number;
      name: string;
    };
    MoldOutputDto: {
      /** Format: int64 */
      id: number;
      manufacturer: components["schemas"]["ManufacturerOutputDto"];
      name: string;
      /** Format: double */
      speed: number;
      /** Format: double */
      glide: number;
      /** Format: double */
      stability: number;
      /** Format: double */
      fade: number;
    };
    PlasticOutputDto: {
      /** Format: int64 */
      id: number;
      manufacturer: components["schemas"]["ManufacturerOutputDto"];
      name: string;
    };
    RoleDto: {
      /** Format: int64 */
      id: number;
      name?: string;
      /** Format: int64 */
      groupId?: number;
    };
    UserOutputDto: {
      /** Format: int64 */
      id: number;
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      /** Format: int32 */
      pdgaNumber: number;
      jwt?: string;
      roles?: (components["schemas"]["RoleDto"])[];
      groups?: (components["schemas"]["GroupDto"])[];
      error?: string;
    };
    GroupCreateDto: {
      name?: string;
    };
    GroupRequestDto: {
      /** Format: int64 */
      targetUserId: number;
      /** @enum {string} */
      type: "JOIN" | "KICK" | "PROMOTE" | "DEMOTE";
      info?: string;
    };
    GroupRequestOutputDto: {
      /** Format: int64 */
      id: number;
      group: components["schemas"]["GroupDto"];
      source: components["schemas"]["UserOutputDto"];
      target: components["schemas"]["UserOutputDto"];
      /** @enum {string} */
      type: "JOIN" | "KICK" | "PROMOTE" | "DEMOTE";
      /** @enum {string} */
      status: "REQUESTED" | "COMPLETED" | "REJECTED";
      info?: string;
      error?: string;
    };
    CompleteGroupRequestDto: {
      confirm?: boolean;
    };
    BuyOutputDto: {
      /** Format: int64 */
      id: number;
      disc: components["schemas"]["DiscOutputDto"];
      seller: components["schemas"]["UserOutputDto"];
      buyer: components["schemas"]["UserOutputDto"];
      /** @enum {string} */
      status: "REQUESTED" | "CONFIRMED" | "REJECTED";
    };
    DiscSearchDto: {
      criteria?: (components["schemas"]["SearchCriteria"])[];
    };
    SearchCriteria: {
      key: string;
      value: Record<string, never>;
      /** @enum {string} */
      operation: "EQUAL" | "NOT_EQUAL" | "GREATER_THAN" | "GREATER_THAN_EQUAL" | "LESS_THAN" | "LESS_THAN_EQUAL" | "IN" | "NOT_IN";
    };
    PageDiscOutputDto: {
      /** Format: int32 */
      totalPages?: number;
      /** Format: int64 */
      totalElements?: number;
      /** Format: int32 */
      number?: number;
      sort?: components["schemas"]["SortObject"];
      /** Format: int32 */
      size?: number;
      content?: (components["schemas"]["DiscOutputDto"])[];
      pageable?: components["schemas"]["PageableObject"];
      /** Format: int32 */
      numberOfElements?: number;
      first?: boolean;
      last?: boolean;
      empty?: boolean;
    };
    PageableObject: {
      sort?: components["schemas"]["SortObject"];
      /** Format: int64 */
      offset?: number;
      /** Format: int32 */
      pageNumber?: number;
      /** Format: int32 */
      pageSize?: number;
      paged?: boolean;
      unpaged?: boolean;
    };
    SortObject: {
      sorted?: boolean;
      unsorted?: boolean;
      empty?: boolean;
    };
    PlasticCreateDto: {
      /** Format: int64 */
      manufacturerId?: number;
      name?: string;
    };
    MoldCreateDto: {
      /** Format: int64 */
      manufacturerId?: number;
      name?: string;
      /** Format: double */
      speed?: number;
      /** Format: double */
      glide?: number;
      /** Format: double */
      stability?: number;
      /** Format: double */
      fade?: number;
    };
    RoundDto: {
      tournament?: string;
      link?: string;
      date?: string;
      /** Format: int32 */
      round?: number;
      /** Format: int32 */
      score?: number;
      /** Format: int32 */
      rating?: number;
      /** Format: int32 */
      holes?: number;
      included?: boolean;
      doubled?: boolean;
    };
    UserUpdateDto: {
      username?: string;
      firstName?: string;
      lastName?: string;
      /** Format: int32 */
      pdgaNumber?: number;
      addToRole?: string;
      removeFromRole?: string;
      /** Format: int64 */
      removeFromGroupId?: number;
    };
    UploadDto: {
      data?: string;
    };
    PageUserOutputDto: {
      /** Format: int32 */
      totalPages?: number;
      /** Format: int64 */
      totalElements?: number;
      /** Format: int32 */
      number?: number;
      sort?: components["schemas"]["SortObject"];
      /** Format: int32 */
      size?: number;
      content?: (components["schemas"]["UserOutputDto"])[];
      pageable?: components["schemas"]["PageableObject"];
      /** Format: int32 */
      numberOfElements?: number;
      first?: boolean;
      last?: boolean;
      empty?: boolean;
    };
    Pageable: {
      /** Format: int32 */
      page?: number;
      /** Format: int32 */
      size?: number;
      sort?: (string)[];
    };
    PageStats: {
      /** Format: int32 */
      totalPages?: number;
      /** Format: int64 */
      totalElements?: number;
      /** Format: int32 */
      number?: number;
      sort?: components["schemas"]["SortObject"];
      /** Format: int32 */
      size?: number;
      content?: (components["schemas"]["Stats"])[];
      pageable?: components["schemas"]["PageableObject"];
      /** Format: int32 */
      numberOfElements?: number;
      first?: boolean;
      last?: boolean;
      empty?: boolean;
    };
    Stats: {
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      updatedAt?: string;
      /** Format: int64 */
      id?: number;
      /** Format: int32 */
      year?: number;
      /** Format: int32 */
      month?: number;
      /** Format: int32 */
      newDiscs?: number;
      /** Format: int32 */
      newUsers?: number;
      /** Format: int32 */
      newManufacturers?: number;
      /** Format: int32 */
      newPlastics?: number;
      /** Format: int32 */
      newMolds?: number;
      /** Format: int32 */
      salesCompleted?: number;
    };
    DropdownOutputDto: {
      /** Format: int64 */
      value: number;
      name: string;
    };
    DropdownsDto: {
      manufacturers: (components["schemas"]["DropdownOutputDto"])[];
      molds: (components["schemas"]["DropdownOutputDto"])[];
      plastics: (components["schemas"]["DropdownOutputDto"])[];
      colors: (components["schemas"]["DropdownOutputDto"])[];
      conditions: (components["schemas"]["DropdownOutputDto"])[];
      markings: (components["schemas"]["DropdownOutputDto"])[];
    };
    SupportedOperation: {
      field: string;
      type: string;
      operations: ("EQUAL" | "NOT_EQUAL" | "GREATER_THAN" | "GREATER_THAN_EQUAL" | "LESS_THAN" | "LESS_THAN_EQUAL" | "IN" | "NOT_IN")[];
    };
    PagePlasticOutputDto: {
      /** Format: int32 */
      totalPages?: number;
      /** Format: int64 */
      totalElements?: number;
      /** Format: int32 */
      number?: number;
      sort?: components["schemas"]["SortObject"];
      /** Format: int32 */
      size?: number;
      content?: (components["schemas"]["PlasticOutputDto"])[];
      pageable?: components["schemas"]["PageableObject"];
      /** Format: int32 */
      numberOfElements?: number;
      first?: boolean;
      last?: boolean;
      empty?: boolean;
    };
    PageMoldOutputDto: {
      /** Format: int32 */
      totalPages?: number;
      /** Format: int64 */
      totalElements?: number;
      /** Format: int32 */
      number?: number;
      sort?: components["schemas"]["SortObject"];
      /** Format: int32 */
      size?: number;
      content?: (components["schemas"]["MoldOutputDto"])[];
      pageable?: components["schemas"]["PageableObject"];
      /** Format: int32 */
      numberOfElements?: number;
      first?: boolean;
      last?: boolean;
      empty?: boolean;
    };
    BuySummaryDto: {
      asBuyer: (components["schemas"]["BuyOutputDto"])[];
      asSeller: (components["schemas"]["BuyOutputDto"])[];
    };
    RatingDto: {
      rounds?: (components["schemas"]["RoundDto"])[];
      /** Format: int32 */
      nextRating?: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  getDisc: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["DiscOutputDto"];
        };
      };
    };
  };
  updateDisc: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["DiscInputDto"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["DiscOutputDto"];
        };
      };
    };
  };
  deleteDisc: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    responses: {
      /** @description OK */
      200: never;
    };
  };
  getGroups: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": (components["schemas"]["GroupDto"])[];
        };
      };
    };
  };
  createGroup: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["GroupCreateDto"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["GroupDto"];
        };
      };
    };
  };
  registerGroupRequest: {
    parameters: {
      path: {
        groupId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["GroupRequestDto"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["GroupRequestOutputDto"];
        };
      };
    };
  };
  completeRequest: {
    parameters: {
      path: {
        groupId: number;
        requestId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CompleteGroupRequestDto"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["UserOutputDto"];
        };
      };
    };
  };
  getDiscs: {
    parameters?: {
        /** @description Zero-based page index (0..N) */
        /** @description The size of the page to be returned */
        /** @description Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
      query?: {
        userId?: number;
        page?: number;
        size?: number;
        sort?: (string)[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["PageDiscOutputDto"];
        };
      };
    };
  };
  createDisc: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["DiscOutputDto"];
        };
      };
    };
  };
  buyDisc: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["BuyOutputDto"];
        };
      };
    };
  };
  supportedSearchOperations: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": (components["schemas"]["SupportedOperation"])[];
        };
      };
    };
  };
  search: {
    parameters?: {
        /** @description Zero-based page index (0..N) */
        /** @description The size of the page to be returned */
        /** @description Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
      query?: {
        page?: number;
        size?: number;
        sort?: (string)[];
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["DiscSearchDto"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["PageDiscOutputDto"];
        };
      };
    };
  };
  getPlastics: {
    parameters?: {
        /** @description Zero-based page index (0..N) */
        /** @description The size of the page to be returned */
        /** @description Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
      query?: {
        manufacturerId?: number;
        page?: number;
        size?: number;
        sort?: (string)[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["PagePlasticOutputDto"];
        };
      };
    };
  };
  createMuovi: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["PlasticCreateDto"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["PlasticOutputDto"];
        };
      };
    };
  };
  getMolds: {
    parameters?: {
        /** @description Zero-based page index (0..N) */
        /** @description The size of the page to be returned */
        /** @description Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
      query?: {
        manufacturerId?: number;
        page?: number;
        size?: number;
        sort?: (string)[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["PageMoldOutputDto"];
        };
      };
    };
  };
  createMold: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["MoldCreateDto"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["MoldOutputDto"];
        };
      };
    };
  };
  reject: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: never;
    };
  };
  confirm: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: never;
    };
  };
  getRating: {
    parameters?: {
      query?: {
        byRoundsOnly?: boolean;
      };
    };
    requestBody: {
      content: {
        "application/json": (components["schemas"]["RoundDto"])[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": number;
        };
      };
    };
  };
  getDetails: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["UserOutputDto"];
        };
      };
    };
  };
  updateDetails: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserUpdateDto"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["UserOutputDto"];
        };
      };
    };
  };
  updateImage: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UploadDto"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["DiscOutputDto"];
        };
      };
    };
  };
  markFound: {
    parameters: {
      path: {
        uuid: string;
      };
    };
    responses: {
      /** @description OK */
      200: never;
    };
  };
  getUsers: {
    parameters?: {
        /** @description Zero-based page index (0..N) */
        /** @description The size of the page to be returned */
        /** @description Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
      query?: {
        groupId?: number;
        page?: number;
        size?: number;
        sort?: (string)[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["PageUserOutputDto"];
        };
      };
    };
  };
  getMe: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["UserOutputDto"];
        };
      };
    };
  };
  getStats: {
    parameters: {
      query: {
        pageable: components["schemas"]["Pageable"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["PageStats"];
        };
      };
    };
  };
  login: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["UserOutputDto"];
        };
      };
    };
  };
  getGroupRequests: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": (components["schemas"]["GroupRequestOutputDto"])[];
        };
      };
    };
  };
  getDropdowns: {
    parameters?: {
      query?: {
        manufacturerId?: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["DropdownsDto"];
        };
      };
    };
  };
  getLost: {
    parameters?: {
        /** @description Zero-based page index (0..N) */
        /** @description The size of the page to be returned */
        /** @description Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
      query?: {
        page?: number;
        size?: number;
        sort?: (string)[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["PageDiscOutputDto"];
        };
      };
    };
  };
  getDiscsForSale: {
    parameters?: {
        /** @description Zero-based page index (0..N) */
        /** @description The size of the page to be returned */
        /** @description Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
      query?: {
        page?: number;
        size?: number;
        sort?: (string)[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["PageDiscOutputDto"];
        };
      };
    };
  };
  listing: {
    parameters?: {
      query?: {
        status?: "REQUESTED" | "CONFIRMED" | "REJECTED";
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": (components["schemas"]["BuyOutputDto"])[];
        };
      };
    };
  };
  summary: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["BuySummaryDto"];
        };
      };
    };
  };
  getRounds: {
    parameters: {
      path: {
        pdga: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["RatingDto"];
        };
      };
    };
  };
  deleteGroup: {
    parameters: {
      path: {
        groupId: number;
      };
    };
    responses: {
      /** @description OK */
      200: never;
    };
  };
}
