/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { cpus } from 'node:os';
import type { PolicyEvaluateContext, PolicyEvaluator, PolicyWithType } from '@authup/access';
import { PolicyType } from '../../constants';
import type { CPUPolicyData, CPUPolicyOptions } from './types';

export class CPUPolicyEvaluator implements PolicyEvaluator<CPUPolicyOptions, CPUPolicyData> {
    async can(
        ctx: PolicyEvaluateContext<PolicyWithType>,
    ) : Promise<boolean> {
        return ctx.spec.type === PolicyType.CPU;
    }

    async evaluate(ctx: PolicyEvaluateContext<CPUPolicyOptions, CPUPolicyData>) : Promise<boolean> {
        let amount : number;
        if (
            ctx.data &&
            typeof ctx.data.amount === 'number'
        ) {
            amount = ctx.data.amount;
        } else {
            amount = cpus().length;
        }

        return ctx.spec.min <= amount;
    }

    async validateData(ctx: PolicyEvaluateContext<CPUPolicyOptions>): Promise<CPUPolicyData> {
        return ctx.data as CPUPolicyData;
    }

    async validateSpecification(ctx: PolicyEvaluateContext): Promise<CPUPolicyOptions> {
        return ctx.spec as CPUPolicyOptions;
    }
}
