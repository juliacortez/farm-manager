import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// ]
@Injectable()
export class ErrorService {
  constructor(public http: HttpClient) {}

  /**
   *
   * @param err
   */
  throw(error: any) {
    const messages: Record<number, string> = {
      204: 'Nenhum conteúdo encontrado.',
      401: 'Acesso não autorizado.',
      403: 'Você não tem permissão para acessar a página.',
      404: 'Página não encontrada.',
    };

    return {
      status: error.status,
      url: error.url,
      message: error.error?.message || messages[error.status] || 'Algo deu errado. Por favor, entre em contato com o suporte para te ajudarmos.',
    };
  }
}
