export interface UserSession {
  sessionkey: string;
  wsid: string;
  username: string;
  creation_time: string;
  active: boolean;
  source: string | null;
  licenceinfo: string;
}
