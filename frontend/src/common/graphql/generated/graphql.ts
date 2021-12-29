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


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  GetAllUsers: Array<UserDto>;
  GetUserByID: UserDto;
  Login: SigninDto;
  SendForgotPasswordReq: Scalars['Boolean'];
  checkIfEmailExists: Scalars['Boolean'];
  verifyAuthCode: Scalars['Boolean'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryLoginArgs = {
  signinInput: SignInInput;
};


export type QuerySendForgotPasswordReqArgs = {
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