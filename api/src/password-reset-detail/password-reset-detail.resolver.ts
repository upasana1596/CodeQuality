import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PasswordResetDetailService } from './password-reset-detail.service';
import { PasswordResetDetailDto } from './password-reset.dto';
import { PasswordResetDetail } from './schema/password-detail.schema';

@Resolver()
export class PasswordResetDetailResolver {
    constructor(private readonly passwordService: PasswordResetDetailService) {}

    /**
     * Get All Password Reset Details. 
     * @return password reset details information.
     */

    @Query(() => [PasswordResetDetailDto], { name: 'getAllPasswordDetail' })
    async getAllPasswordDetail() {
        return this.passwordService.findAll();
    }

    /**
     * Add Password Reset Details. 
     * @return password reset detail information.
     */
    @Mutation(() => PasswordResetDetailDto, { name: 'addPasswordDetail' })
    async addPasswordDetail(
        @Args('email', { type: () => String }) email: string,
        @Args('verification_code', { type: () => String }) verification_code: string,
    ) {
        return this.passwordService.create(email,verification_code);
    }
}
