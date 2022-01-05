import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from '@apollo/client/core';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

export function createApollo(httpLink: HttpLink, router: Router) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('accessToken');
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  });

  const error = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, extensions, locations, path }) => {
        console.error(`[GraphQL error]:`, graphQLErrors);
        if (extensions?.response.statusCode === 401) {
          router.navigate(['/login']);
        }
      });
    }

    if (networkError) {
      console.error(`[Network error]: `, networkError);
    }
  });

  const uri  = 'http://localhost:3000/graphql';

  const link = ApolloLink.from([basic, auth, error, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  };
}

const modules = [CommonModule, HttpClientModule, HttpLinkModule];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Router],
    },
  ],
})
export class GraphQLModule {}
