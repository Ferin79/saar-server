import { ResourceWithOptions } from 'adminjs';
import { User, UserLoginType, UserRole } from './entities/user.entity.js';
import * as bcrypt from 'bcrypt';

export const UserResource: ResourceWithOptions = {
  resource: User,
  options: {
    properties: {
      email: {
        isRequired: true,
        isTitle: true,
        type: 'string',
        isVisible: {
          list: true,
          edit: true,
          filter: true,
          show: true,
        },
      },
      name: {
        isRequired: true,
        isVisible: {
          list: true,
          edit: true,
          filter: true,
          show: true,
        },
      },
      password: {
        type: 'password',
        isVisible: {
          list: false,
          edit: true,
          filter: false,
          show: false,
        },
      },
      avatar: {
        type: 'string',
        isVisible: {
          list: true,
          edit: true,
          filter: false,
          show: true,
        },
      },
      thirdPartyId: {
        isVisible: {
          list: false,
          edit: true,
          filter: false,
          show: true,
        },
      },
      loginType: {
        availableValues: Object.values(UserLoginType).map((type) => ({
          value: type,
          label: type.charAt(0).toUpperCase() + type.slice(1),
        })),
        isRequired: true,
        isVisible: {
          list: true,
          edit: true,
          filter: true,
          show: true,
        },
      },
      role: {
        availableValues: Object.values(UserRole).map((role) => ({
          value: role,
          label: role.charAt(0).toUpperCase() + role.slice(1),
        })),
        isRequired: true,
        isVisible: {
          list: true,
          edit: true,
          filter: true,
          show: true,
        },
      },
      createdAt: {
        isVisible: {
          list: true,
          edit: false,
          filter: true,
          show: true,
        },
      },
      updatedAt: {
        isVisible: {
          list: true,
          edit: false,
          filter: true,
          show: true,
        },
      },
    },
    actions: {
      new: {
        before: async (request) => {
          if (request.payload.password) {
            request.payload = {
              ...request.payload,
              password: await bcrypt.hash(request.payload.password, 10),
              // Ensure loginType is set to LOCAL
              loginType: request.payload.loginType || UserLoginType.LOCAL,
            };
          }
          return request;
        },
      },
      edit: {
        before: async (request) => {
          if (
            request.payload.password &&
            !request.payload.password.startsWith('$2b$')
          ) {
            request.payload = {
              ...request.payload,
              password: await bcrypt.hash(request.payload.password, 10),
            };
          }
          return request;
        },
      },
    },
  },
};
