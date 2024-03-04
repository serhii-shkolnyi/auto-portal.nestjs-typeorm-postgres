import { SetMetadata } from "@nestjs/common";

import { SKIP_AUTH } from "../constants/auth.constant";

export const SkipAuth = () => SetMetadata(SKIP_AUTH, true);
