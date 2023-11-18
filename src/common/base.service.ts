import { NotFoundException } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";

export class BaseService<T> {

    constructor(private repo: Repository<T>) {}

    async getByIdOrThrowNotFoundException(params: FindOptionsWhere<T>) {
        const item = await this.repo.findOneBy(params);
        if (!item) throw new NotFoundException(`${this.getClassName()} with Id: ${params['id'] } was not found`);
        return item;
    }

    private getClassName(): string {
        return (this.repo.target as Function).name;
    }
}