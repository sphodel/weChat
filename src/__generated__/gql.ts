/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query Chat_Content($to: Int!) {\n  chats(where: {to: {_eq: $to}} order_by: {time: desc}, limit: 1) {\n    id\n    text\n    time\n  }\n}\n": types.Chat_ContentDocument,
    "\n  query contact {\n  contacts {\n    contact_user {\n      id\n      name\n      phone\n    }\n    contact_user_id\n  }\n}\n": types.ContactDocument,
    "query GET_CONTACT($user_id: Int!, $contact_user_id: Int!) {\n  contacts(where: {contact_user_id: {_eq: $contact_user_id}, user_id: {_eq: $user_id}}) {\n    contact_user_id\n  }\n}\n": types.Get_ContactDocument,
    "\nquery MyMutation($userName: String!, $userPhone: String!) {\n  users(where: {_and: {name: {_eq: $userName}, phone: {_eq: $userPhone}}}) {\n    id\n  }\n}\n": types.MyMutationDocument,
    "mutation AddContact($contact_user_id: Int!, $user_id: Int!) {\n  insert_contacts_one(object: {contact_user_id: $contact_user_id, user_id: $user_id}) {\n    contact_user_id\n  }\n}": types.AddContactDocument,
    "mutation Chat( $text: String!, $time: timestamp!, $to: Int!) {\n  insert_chats_one(object: {text: $text, time: $time, to: $to, from: 1}) {\n    text\n  }\n}\n": types.ChatDocument,
    "mutation delete_contact($contact_user_id: Int!) {\n  delete_contacts(where: {contact_user_id: {_eq: $contact_user_id}}) {\n    returning {\n      user_id\n    }\n  }\n}": types.Delete_ContactDocument,
    "query ChatContent($to: Int!) {\n  chats(where: {to: {_eq: $to}} order_by: {time: desc}) {\n    text\n  }\n}\n": types.ChatContentDocument,
    "mutation reg_new_user($password: String!, $name: String!, $phone: String = \"\") {\n  insert_users_one(object: {password: $password, phone: $phone, name: $name}) {\n    id\n  }\n}": types.Reg_New_UserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Chat_Content($to: Int!) {\n  chats(where: {to: {_eq: $to}} order_by: {time: desc}, limit: 1) {\n    id\n    text\n    time\n  }\n}\n"): (typeof documents)["query Chat_Content($to: Int!) {\n  chats(where: {to: {_eq: $to}} order_by: {time: desc}, limit: 1) {\n    id\n    text\n    time\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query contact {\n  contacts {\n    contact_user {\n      id\n      name\n      phone\n    }\n    contact_user_id\n  }\n}\n"): (typeof documents)["\n  query contact {\n  contacts {\n    contact_user {\n      id\n      name\n      phone\n    }\n    contact_user_id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GET_CONTACT($user_id: Int!, $contact_user_id: Int!) {\n  contacts(where: {contact_user_id: {_eq: $contact_user_id}, user_id: {_eq: $user_id}}) {\n    contact_user_id\n  }\n}\n"): (typeof documents)["query GET_CONTACT($user_id: Int!, $contact_user_id: Int!) {\n  contacts(where: {contact_user_id: {_eq: $contact_user_id}, user_id: {_eq: $user_id}}) {\n    contact_user_id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery MyMutation($userName: String!, $userPhone: String!) {\n  users(where: {_and: {name: {_eq: $userName}, phone: {_eq: $userPhone}}}) {\n    id\n  }\n}\n"): (typeof documents)["\nquery MyMutation($userName: String!, $userPhone: String!) {\n  users(where: {_and: {name: {_eq: $userName}, phone: {_eq: $userPhone}}}) {\n    id\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation AddContact($contact_user_id: Int!, $user_id: Int!) {\n  insert_contacts_one(object: {contact_user_id: $contact_user_id, user_id: $user_id}) {\n    contact_user_id\n  }\n}"): (typeof documents)["mutation AddContact($contact_user_id: Int!, $user_id: Int!) {\n  insert_contacts_one(object: {contact_user_id: $contact_user_id, user_id: $user_id}) {\n    contact_user_id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation Chat( $text: String!, $time: timestamp!, $to: Int!) {\n  insert_chats_one(object: {text: $text, time: $time, to: $to, from: 1}) {\n    text\n  }\n}\n"): (typeof documents)["mutation Chat( $text: String!, $time: timestamp!, $to: Int!) {\n  insert_chats_one(object: {text: $text, time: $time, to: $to, from: 1}) {\n    text\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation delete_contact($contact_user_id: Int!) {\n  delete_contacts(where: {contact_user_id: {_eq: $contact_user_id}}) {\n    returning {\n      user_id\n    }\n  }\n}"): (typeof documents)["mutation delete_contact($contact_user_id: Int!) {\n  delete_contacts(where: {contact_user_id: {_eq: $contact_user_id}}) {\n    returning {\n      user_id\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query ChatContent($to: Int!) {\n  chats(where: {to: {_eq: $to}} order_by: {time: desc}) {\n    text\n  }\n}\n"): (typeof documents)["query ChatContent($to: Int!) {\n  chats(where: {to: {_eq: $to}} order_by: {time: desc}) {\n    text\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation reg_new_user($password: String!, $name: String!, $phone: String = \"\") {\n  insert_users_one(object: {password: $password, phone: $phone, name: $name}) {\n    id\n  }\n}"): (typeof documents)["mutation reg_new_user($password: String!, $name: String!, $phone: String = \"\") {\n  insert_users_one(object: {password: $password, phone: $phone, name: $name}) {\n    id\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;