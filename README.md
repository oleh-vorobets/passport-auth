# OAuth2 authorization

OAuth 2.0 is the industry-standard protocol for authorization. OAuth2 - an authorization protocol that allows one service (application) to grant access rights to a user's resources on another service. **The protocol eliminates the need to trust the application with a login and password, and allows you to grant a limited set of rights rather than all at once.** The key difference from OAuth 1.0 is simplicity. In the new version, there are no immense signature schemes and the number of requests required for authorization has been reduced.
The result of authorization is an _access token_ in the query params - some kind of key (usually just a set of characters), the presentation of which is a pass to protected resources.
