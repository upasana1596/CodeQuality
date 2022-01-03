import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  CompleteUserAccountProcess: Scalars['Boolean'];
  DeleteUser: UserDto;
  SendEmail: UserDto;
  SignUp: Scalars['Boolean'];
  UpdateForgotUserPassword: Scalars['Boolean'];
  UpdateResetUserPassword: Scalars['Boolean'];
  UpdateUser: UserDto;
};


export type MutationCompleteUserAccountProcessArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  status: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationSendEmailArgs = {
  emailId: Scalars['String'];
  verification_code: Scalars['String'];
};


export type MutationSignUpArgs = {
  input: UserInput;
};


export type MutationUpdateForgotUserPasswordArgs = {
  email: Scalars['String'];
  newPasswordHash: Scalars['String'];
};


export type MutationUpdateResetUserPasswordArgs = {
  email: Scalars['String'];
  newPasswordHash: Scalars['String'];
  oldpasswordHash: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  last_name?: InputMaybe<Scalars['String']>;
  mobile_no?: InputMaybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  GetAllUsers: Array<UserDto>;
  GetUserByID: UserDto;
  Login: SigninDto;
  SendForgotPasswordRequest: Scalars['Boolean'];
  SendResetPasswordRequest: Scalars['Boolean'];
  checkIfEmailExists: Scalars['Boolean'];
  verifyAuthCode: Scalars['Boolean'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryLoginArgs = {
  signinInput: SignInInput;
};


export type QuerySendForgotPasswordRequestArgs = {
  email: Scalars['String'];
};


export type QuerySendResetPasswordRequestArgs = {
  email: Scalars['String'];
};


export type QueryCheckIfEmailExistsArgs = {
  emailId: Scalars['String'];
};


export type QueryVerifyAuthCodeArgs = {
  email: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type SignInInput = {
  email: Scalars['String'];
  passwordHash?: InputMaybe<Scalars['String']>;
};

export type SigninDto = {
  __typename?: 'SigninDto';
  accessToken: Scalars['String'];
  user: UserDto;
};

export type UserDto = {
  __typename?: 'UserDto';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  last_name?: Maybe<Scalars['String']>;
  mobile_no?: Maybe<Scalars['Float']>;
  passwordHash?: Maybe<Scalars['String']>;
  status_code?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verification_code?: Maybe<Scalars['String']>;
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name: Scalars['String'];
  mobile_no?: InputMaybe<Scalars['Float']>;
  passwordHash?: InputMaybe<Scalars['String']>;
  status_code?: InputMaybe<Scalars['Float']>;
  verification_code?: InputMaybe<Scalars['String']>;
};

export type SignUpMutationVariables = Exact<{
  input: UserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', SignUp: boolean };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  email: Scalars['String'];
  mobile_no: Scalars['Float'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', UpdateUser: { __typename?: 'UserDto', last_name?: string | null | undefined, first_name?: string | null | undefined, email?: string | null | undefined } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', GetAllUsers: Array<{ __typename?: 'UserDto', id: string, first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined }> };

export type LoginQueryVariables = Exact<{
  input: SignInInput;
}>;


export type LoginQuery = { __typename?: 'Query', Login: { __typename?: 'SigninDto', user: { __typename?: 'UserDto', id: string, email?: string | null | undefined } } };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', GetUserByID: { __typename?: 'UserDto', first_name?: string | null | undefined, last_name?: string | null | undefined, email?: string | null | undefined, passwordHash?: string | null | undefined, mobile_no?: number | null | undefined } };

export const SignUpDocument = gql`
    mutation SignUp($input: UserInput!) {
  SignUp(input: $input)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SignUpGQL extends Apollo.Mutation<SignUpMutation, SignUpMutationVariables> {
    override document = SignUpDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: String!, $first_name: String!, $last_name: String!, $email: String!, $mobile_no: Float!) {
  UpdateUser(
    id: $id
    first_name: $first_name
    last_name: $last_name
    email: $email
    mobile_no: $mobile_no
  ) {
    last_name
    first_name
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    override document = UpdateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  GetAllUsers {
    id
    first_name
    last_name
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllUsersGQL extends Apollo.Query<GetAllUsersQuery, GetAllUsersQueryVariables> {
    override document = GetAllUsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    query Login($input: SignInInput!) {
  Login(signinInput: $input) {
    user {
      id
      email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Query<LoginQuery, LoginQueryVariables> {
    override document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUserByIdDocument = gql`
    query GetUserByID($id: String!) {
  GetUserByID(id: $id) {
    first_name
    last_name
    email
    passwordHash
    mobile_no
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserByIdGQL extends Apollo.Query<GetUserByIdQuery, GetUserByIdQueryVariables> {
    override document = GetUserByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }