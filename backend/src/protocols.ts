export type AuthorizationServer = {
    AuthorisationServerId: string;
    AutoRegistrationSupported: boolean;
    AutoRegistrationNotificationWebhook: null | string;
    SupportsCiba: boolean;
    SupportsDCR: boolean;
    SupportsRedirect: boolean;
    CustomerFriendlyDescription: string;
    CustomerFriendlyLogoUri: string;
    CustomerFriendlyName: string;
    DeveloperPortalUri: null | string;
    TermsOfServiceUri: null | string;
    NotificationWebhookAddedDate: null | string;
    OpenIDDiscoveryDocument: null | string;
    Issuer: null | string;
    FederationEndpoint: null | string;
    PayloadSigningCertLocationUri: string;
    CreatedAt: number;
    ParentAuthorisationServerId: null | string;
    DeprecatedDate: null | string;
    RetirementDate: null | string;
    SupersededByAuthorisationServerId: null | string;
    ApiResources: any[];
    AuthorisationServerCertifications: any[];
}

export type OrgDomainClaim = {
    AuthorisationDomainName: string;
    AuthorityName: string;
    RegistrationId: string;
    Status: string;
}

export type OrgDomainRoleClaim = {
    Status: string;
    AuthorisationDomain: string;
    Role: string;
    RegistrationId: string;
    Authorisations: any[];
    RoleType: string;
    Exclusive: boolean;
    Metadata: any[];
}

export type Participant = {
    OrganisationId: string;
    Status: string;
    OrganisationName: string;
    CreatedOn: string;
    LegalEntityName: string;
    CountryOfRegistration: string;
    CompanyRegister: string;
    Tags: string[];
    Size: null | string;
    RegistrationNumber: string;
    RegistrationId: string;
    RegisteredName: string;
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    Postcode: string;
    Country: string;
    ParentOrganisationReference: string;
    AuthorisationServers: AuthorizationServer[];
    OrgDomainClaims: OrgDomainClaim[];
    OrgDomainRoleClaims: OrgDomainRoleClaim[];
}

export type ListParticipant = {
    name: string;
    logoUri: string;
    openId: string;
}
