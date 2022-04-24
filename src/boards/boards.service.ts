import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v1 as uuid } from 'uuid';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRpository: BoardRepository,
  ) {}

  //   getAllBoards(): Board[] {
  //     return this.boards;
  //   }
  //   createBoard(createBoardDto: CreateBoardDto) {
  //     const { title, description } = createBoardDto;
  //     const board: Board = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: BoardStatus.PUBLIC,
  //     };
  //     this.boards.push(board);
  //     return board;
  //   }
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRpository.createBoard(createBoardDto);
  }
  //   getBoardById(id: string) {
  //     const found = this.boards.find((board) => board.id === id);
  //     if (!found) {
  //       throw new NotFoundException(`Can't find board with id ${id}`);
  //     }
  //     return found;
  //   }
  async getBoardById(id: number) {
    const found = await this.boardRpository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }

    return found;
  }
  //   deleteBoard(id: string): void {
  //     const found = this.getBoardById(id);
  //     this.boards = this.boards.filter((board) => board.id !== found.id);
  //   }
  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRpository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
  }
  //   updateBoardStatus(id: string, status: BoardStatus): Board {
  //     const board = this.getBoardById(id);
  //     board.status = status;
  //     return board;
  //   }
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.boardRpository.findOne(id);

    board.status = status;
    await this.boardRpository.save(board);

    return board;
  }
}
