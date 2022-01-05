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
  id: Scalars['String'];
  input: UserInput;
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
  first_name: Scalars['String'];
  id: Scalars['ID'];
  last_name: Scalars['String'];
  mobile_no: Scalars['Float'];
  passwordHash?: Maybe<Scalars['String']>;
  status_code?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  verification_code?: Maybe<Scalars['String']>;
};

export type UserInput = {
  email: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  mobile_no: Scalars['Float'];
  passwordHash?: InputMaybe<Scalars['String']>;
  status_code?: InputMaybe<Scalars['Float']>;
  verification_code?: InputMaybe<Scalars['String']>;
};

export type SignUpMutationVariables = Exact<{
  input: UserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', SignUp: boolean };

export type UpdateResetUserPasswordMutationVariables = Exact<{
  email: Scalars['String'];
  newPasswordHash: Scalars['String'];
  oldpasswordHash: Scalars['String'];
}>;


export type UpdateResetUserPasswordMutation = { __typename?: 'Mutation', UpdateResetUserPassword: boolean };

export type UpdateForgotUserPasswordMutationVariables = Exact<{
  email: Scalars['String'];
  newPasswordHash: Scalars['String'];
}>;


export type UpdateForgotUserPasswordMutation = { __typename?: 'Mutation', UpdateForgotUserPassword: boolean };

export type LoginQueryVariables = Exact<{
  input: SignInInput;
}>;


export type LoginQuery = { __typename?: 'Query', Login: { __typename?: 'SigninDto', accessToken: string, user: { __typename?: 'UserDto', id: string, first_name: string, last_name: string, email?: string | null | undefined } } };

export type SendForgotPasswordRequestQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendForgotPasswordRequestQuery = { __typename?: 'Query', SendForgotPasswordRequest: boolean };

export type SendResetPasswordRequestQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendResetPasswordRequestQuery = { __typename?: 'Query', SendResetPasswordRequest: boolean };

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
export const UpdateResetUserPasswordDocument = gql`
    mutation UpdateResetUserPassword($email: String!, $newPasswordHash: String!, $oldpasswordHash: String!) {
  UpdateResetUserPassword(
    email: $email
    newPasswordHash: $newPasswordHash
    oldpasswordHash: $oldpasswordHash
  )
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateResetUserPasswordGQL extends Apollo.Mutation<UpdateResetUserPasswordMutation, UpdateResetUserPasswordMutationVariables> {
    override document = UpdateResetUserPasswordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateForgotUserPasswordDocument = gql`
    mutation UpdateForgotUserPassword($email: String!, $newPasswordHash: String!) {
  UpdateForgotUserPassword(email: $email, newPasswordHash: $newPasswordHash)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateForgotUserPasswordGQL extends Apollo.Mutation<UpdateForgotUserPasswordMutation, UpdateForgotUserPasswordMutationVariables> {
    override document = UpdateForgotUserPasswordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    query Login($input: SignInInput!) {
  Login(signinInput: $input) {
    user {
      id
      first_name
      last_name
      email
    }
    accessToken
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
export const SendForgotPasswordRequestDocument = gql`
    query SendForgotPasswordRequest($email: String!) {
  SendForgotPasswordRequest(email: $email)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SendForgotPasswordRequestGQL extends Apollo.Query<SendForgotPasswordRequestQuery, SendForgotPasswordRequestQueryVariables> {
    override document = SendForgotPasswordRequestDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SendResetPasswordRequestDocument = gql`
    query SendResetPasswordRequest($email: String!) {
  SendResetPasswordRequest(email: $email)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SendResetPasswordRequestGQL extends Apollo.Query<SendResetPasswordRequestQuery, SendResetPasswordRequestQueryVariables> {
    override document = SendResetPasswordRequestDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }