import axios from "axios"
import {configEnvironment} from "@/utils/config-environment";
import {ConfigKeys} from "@/constants/config.keys";

describe("Poeditor test", ()=>{
    it("Must return the whole project", async ()=>{
        const r = await axios.post("https://api.poeditor.com/v2/projects/list",
            'api_token='+configEnvironment.get(ConfigKeys.POEDITOR)
        ,{
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            }
        });
        expect(r.status).toEqual(200);
        expect(r.data.response.code).toEqual("200");
    })
});