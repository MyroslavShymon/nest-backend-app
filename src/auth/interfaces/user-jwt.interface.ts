import { Role } from "src/roles/roles.model";

export class userJwt {
  email: string;
  id: number;
  roles: Role[];
}
