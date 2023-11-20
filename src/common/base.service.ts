import { NotFoundException } from "@nestjs/common";
import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";

export class BaseService<T> {

    constructor(private repo: Repository<T>) {}

    async getByIdOrThrowNotFoundException(params: FindOneOptions<T>) {
        
        const item = await this.repo.findOne(params);
        if (!item) throw new NotFoundException(`${this.getClassName()} with Id: ${params['id'] } was not found`);
        return item;
    }

    private getClassName(): string {
        return (this.repo.target as Function).name;
    }
}