module Authenticatable
  extend ActiveSupport::Concern

  included do
    before_action :get_user_from_token
  end

  private

  def get_user_from_token
    jwt_payload = JWT.decode(request.headers['Authorization'].split[1],
                             Rails.application.credentials.fetch(:secret_key_base)).first
    user_id = jwt_payload['sub']
    User.find(user_id.to_s)
  end
end
