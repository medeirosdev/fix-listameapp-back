para subir o docker -> sudo docker-compose up -d
para ver os processos -> sudo docker ps
para fechar os processos -> docker-compose down

Lembrar de configurar o ormconfig  e o .env

Lembrar de rodar o typeorm -> sincronizar o banco de dados

Tokens necessários para criar appointments

sudo docker-compose up -d
yarn dev:server

// Rotas

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profiles', profilesRouter);
routes.use('/agendas', agendasRouter);


/// Appoitments Routes
appointmentsRouter.use(_ensureAuthenticated.default);

appointmentsRouter.post('/', appointmentsController.create);

appointmentsRouter.get('/profile', profileAppointmentsController.index);

appointmentsRouter.get('/profile/:id', profileAppointmentsController.show);

appointmentsRouter.get('/:agendaId', appointmentsController.listByAgenda);

appointmentsRouter.put('/:id', profileAppointmentsController.update);

appointmentsRouter.delete('/', profileAppointmentsController.delete);


///Tipos
export default interface ICreateAppointmentDTO {
  agendaId: string;
  startDate: Date;
  endDate?: Date;
  appointmentName: string;
  appointmentDescription?: string;
  notifyBefore?: number;
  recurrence?: string;
  status: string;
  location?: string;
  isPrivate: boolean;




0 - não usar o npm install, e sim o yarn Install
0.1 - @types/jest / TsJest e Jest devem ter a mesma versão
1- importar manualmente o import { container } from 'tsyringe';
2 - Tirar as notações de @Route de deixar na rota raiz para funcionar
3 - tirar as notações de @modules/../../../../



USER AGENDA

-- public.users_agendas definition

-- Drop table

-- DROP TABLE public.users_agendas;

CREATE TABLE public.users_agendas (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_id uuid NOT NULL,
	agenda_id uuid NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	"role" varchar(100) NULL,
	CONSTRAINT "PK_060be6183733047c3b1ee49b99b" PRIMARY KEY (id),
	CONSTRAINT "UsersAgendasAgendaId" FOREIGN KEY (agenda_id) REFERENCES public.agendas(id) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT "UsersAgendasUserId" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

USERS

-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar NOT NULL,
	email varchar NOT NULL,
	login varchar NOT NULL,
	bio varchar NULL,
	avatar varchar NULL,
	"password" varchar NOT NULL,
	status varchar NOT NULL,
	"type" varchar NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id),
	CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE (login),
	CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email)
);

USER_TOKENS

-- public.user_tokens definition

-- Drop table

-- DROP TABLE public.user_tokens;

CREATE TABLE public.user_tokens (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"token" uuid NOT NULL DEFAULT uuid_generate_v4(),
	user_id uuid NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	CONSTRAINT "PK_63764db9d9aaa4af33e07b2f4bf" PRIMARY KEY (id),
	CONSTRAINT "TokenUserId" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


MIGRATIONS

-- public.migrations definition

-- Drop table

-- DROP TABLE public.migrations;

CREATE TABLE public.migrations (
	id serial4 NOT NULL,
	"timestamp" int8 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id)
);


APPOINTMENTS

-- public.appointments definition

-- Drop table

-- DROP TABLE public.appointments;

CREATE TABLE public.appointments (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	start_date timestamptz NOT NULL,
	end_date timestamptz NULL,
	appointment_name varchar NOT NULL,
	appointment_description varchar NULL,
	"location" varchar NULL,
	status varchar NOT NULL,
	is_private bool NOT NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	recurrence_id uuid NULL,
	notify_before int4 NULL,
	agenda_id uuid NOT NULL,
	CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY (id),
	CONSTRAINT "AppointmentAgendaId" FOREIGN KEY (agenda_id) REFERENCES public.agendas(id) ON DELETE SET NULL ON UPDATE CASCADE
);

AGENDAS

-- public.agendas definition

-- Drop table

-- DROP TABLE public.agendas;

CREATE TABLE public.agendas (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	"name" varchar NOT NULL,
	description varchar NULL,
	avatar varchar NULL,
	is_private bool NOT NULL,
	created_by uuid NULL,
	created_at timestamp NOT NULL DEFAULT now(),
	updated_at timestamp NOT NULL DEFAULT now(),
	members int4 NULL,
	CONSTRAINT "PK_5fea8668c8712b8292ded824549" PRIMARY KEY (id),
	CONSTRAINT "AgendaUserId" FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL ON UPDATE CASCADE
);