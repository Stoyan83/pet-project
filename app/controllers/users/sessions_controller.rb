# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json

    def create
      self.resource = warden.authenticate!(auth_options)
      scope = Devise::Mapping.find_scope!(resource_name)
      warden.session_serializer.store(resource, scope)
      token = generate_jwt_token(resource)
      render json: {
        message: 'You are logged in.',
        user: current_user,
        token:
      }, status: :ok
    end

    def destroy
      user = User.find_by(id: decoded_token['sub'])
      if user.present?
        sign_out(user)
        render json: { message: 'You are logged out.' }, status: :ok
      else
        render json: { message: 'Invalid token' }, status: :unauthorized
      end
    end

    private

    def generate_jwt_token(user)
      payload = {
        sub: user.id,
        scp: "user",
        iat: Time.now.to_i,
        exp: 120.minutes.from_now.to_i,
        jti: SecureRandom.uuid
      }
      JWT.encode payload, Rails.application.credentials.fetch(:secret_key_base)
    end

    def decoded_token
      token = request.headers['Authorization'].split.last
      begin
        JWT.decode(token, Rails.application.credentials.fetch(:secret_key_base), true, algorithm: 'HS256').first
      rescue JWT::DecodeError
        {}
      end
    end

    def respond_to_on_destroy
      log_out_success && return if current_user

      log_out_failure
    end

    def log_out_success
      render json: { message: 'You are logged out.' }, status: :ok
    end

    def log_out_failure
      render json: { message: 'No active session to log out of.' }, status: :unauthorized
    end
  end
end
