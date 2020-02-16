export type Rules = {
    start: Rule[],
    media: Rule[],
    comments: Rule[]
    [ key: string ]: Rule[]
}

export type Rule = {
    include?: string[]
    token?: string | string[],
    regex?: string | RegExp,
    next?: string,
    push?: Rule[],
    defaultToken?: string
    caseIncentive?: boolean;
    onMatch: string
}

export class Tokenizer {
    states: Rules;
    regExps = {};
    matchMappings: any = {};
    private applyToken: any;

    constructor(rules: Rules) {
        this.states = rules;
        for (let key in rules) {
            const state: Rule[] = rules[ key ];
            const ruleRegExp = [];
            const mapping = this.matchMappings[ key ] = {defaultToken: 'text'};
            let flag = 'g';
            for (let i = 0; i < state.length; i++) {
                let rule = state[ i ];
                if (rule.defaultToken) {
                    mapping.defaultToken = rule.defaultToken;
                }
                if (rule.caseIncentive) {
                    flag = 'gi';
                }
                if (rule.regex === null || rule.regex === undefined) {
                    continue;
                }
                if (rule.regex instanceof RegExp) {
                    rule.regex = rule.regex.toString().slice(1, -1);
                }
                const matchCount = new RegExp('(?:(' + rule.regex + ')|(.))').exec('a')!!.length;
                if (Array.isArray(rule.token)) {
                    if (rule.token.length == 1 || matchCount == 1) {
                        rule.token = rule.token[ 0 ];
                    } else if (matchCount - 1 != rule.token.length) {
                        this.reportError('number of classes and regexp groups doesn\'t match', {
                            rule: rule,
                            groupCount: matchCount - 1
                        });
                        rule.token = rule.token[ 0 ];
                    }
                } else if (typeof rule.token == 'function' && !rule.onMatch) {
                    if (matchCount > 1)
                        rule.onMatch = this.applyToken;
                    else
                        rule.onMatch = rule.token;
                }
            }
        }
    }

    reportError(message: string, fb: any) {

    }
}
