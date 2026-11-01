import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Legge i ruoli richiesti sulla rotta (es. @Roles(['admin']))
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se la rotta non richiede ruoli specifici, lascia passare
    if (!requiredRoles) {
      return true;
    }

    // 2. Prende l'utente decodificato dal JWT (request.user)
    const request = context.switchToHttp().getRequest();
    const user = request.user; // 👈 Qui dentro ora c'è { sub, username, role }

    // 3. Controlla se l'utente ha un ruolo
    const userRole = user?.role; // Preso dal payload del login

    if (!userRole) {
      throw new ForbiddenException('Accesso negato: nessun ruolo associato');
    }

    // 4. Verifica se il ruolo dell'utente è incluso tra quelli richiesti
    const hasRole = requiredRoles.includes(userRole);

    if (!hasRole) {
      throw new ForbiddenException(
        'Non hai i permessi necessari per questa operazione',
      );
    }

    return true;
  }
}
