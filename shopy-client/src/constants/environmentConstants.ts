import {configEnvironment} from "@/utils/config-environment";
import {ConfigKeys} from "@/constants/config.keys";

export const EnvironmentConstants = {
    HOST: configEnvironment.get(ConfigKeys.HOST)+":"+configEnvironment.get(ConfigKeys.PORT)+ConfigKeys.BASE_API_URL
};