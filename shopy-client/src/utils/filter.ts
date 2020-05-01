export class Filter
{
    private readonly _filter: string;
    constructor(filter: {[key: string]:string})
    {
        this._filter = '';
        for(const i in filter)
        {
            this._filter += i + "=" + filter[i] + "&";
        }
        if(this._filter.length)
            this._filter.substring(0, this._filter.length - 1);
    }

    get()
    {
        return this._filter;
    }
}